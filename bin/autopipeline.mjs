#!/usr/bin/env node
import {run} from "../src/index.mjs";
run(process.argv.slice(2)).then(console.log).catch(e=>{console.error("AutoPipeline:",e.message);process.exitCode=1;});
