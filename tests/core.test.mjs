import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import {detect,suggest,render,run} from "../src/index.mjs";
async function fixture(files){const dir=await fs.mkdtemp(path.join(os.tmpdir(),"autopipeline-"));for(const [name,data] of Object.entries(files)){await fs.mkdir(path.dirname(path.join(dir,name)),{recursive:true});await fs.writeFile(path.join(dir,name),data);}return dir;}
test("detects npm and scripts",async()=>{const root=await fixture({"package.json":JSON.stringify({scripts:{lint:"eslint",test:"vitest"}}),"package-lock.json":"{}"});const d=await detect(root);assert.equal(d.manager,"npm");assert.equal(suggest(d).ci.unit,true);await fs.rm(root,{recursive:true,force:true});});
test("generates and checks workflow",async()=>{const root=await fixture({"package.json":JSON.stringify({scripts:{test:"vitest"}}),"package-lock.json":"{}"});await run(["init"],root);await run(["generate"],root);assert.match(await run(["check"],root),/matches/);await fs.appendFile(path.join(root,".github/workflows/autopipeline.yml"),"# drift\n");await assert.rejects(run(["check"],root),/drifted/);await fs.rm(root,{recursive:true,force:true});});
test("rejects missing test script",()=>{const d={language:"node",manager:"npm",scripts:{}};const c=suggest(d);c.ci.unit=true;assert.throws(()=>render(c,d),/Missing script/);});
test("blocks deployments",()=>{const d={language:"node",manager:"npm",scripts:{test:"vitest"}};const c=suggest(d);c.deploy.enabled=true;assert.throws(()=>render(c,d),/Deployment/);});
test("generated workflows are least privileged",()=>{const d={language:"node",manager:"npm",scripts:{test:"vitest"}};const out=render(suggest(d),d);assert.match(out,/contents: read/);assert.match(out,/checkout@[0-9a-f]{40}/);assert.doesNotMatch(out,/pull_request_target/);});
test("supports Python",()=>{assert.match(render(suggest({language:"python",scripts:{}})),/pytest/);});
test("supports Maven",()=>{assert.match(render(suggest({language:"java",scripts:{}})),/mvnw/);});

test("supports explicit install commands",()=>{const d={language:"node",manager:"npm",scripts:{build:"next build"}};const c=suggest(d);c.ci.commands={install:"npm ci --legacy-peer-deps"};assert.match(render(c,d),/npm ci --legacy-peer-deps/);});
test("rejects multiline install command overrides",()=>{const d={language:"node",manager:"npm",scripts:{build:"next build"}};const c=suggest(d);c.ci.commands={install:"npm ci\\nmalicious"};assert.throws(()=>render(c,d),/Invalid command/);});
