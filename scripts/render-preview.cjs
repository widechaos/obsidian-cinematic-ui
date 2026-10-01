/* Render fictional DOM previews of the shipped CSS. Requires Playwright. */
const {chromium}=require('playwright');
const fs=require('fs');
const path=require('path');
const root=path.resolve(__dirname,'..');
(async()=>{
 const browser=await chromium.launch({headless:true, ...(process.env.PLAYWRIGHT_CHANNEL ? {channel:process.env.PLAYWRIGHT_CHANNEL} : {})});
 const page=await browser.newPage({viewport:{width:1440,height:960},deviceScaleFactor:1});
 const bundle=fs.readFileSync(path.join(root,'snippets/obsidian-cinematic-ui.css'),'utf8');
 const folders=fs.readFileSync(path.join(root,'snippets/cinematic-folders.css'),'utf8');
 const tree=(depth)=>`<div class="nav-folder"><div class="nav-folder-title"><span class="nav-folder-title-content">${['Studio','Projects','Field Notes','Release'][depth]}</span><span class="level">0${depth+1}</span></div><div class="nav-folder-children">${depth<3?tree(depth+1):Array.from({length:32},(_,i)=>`<div class="nav-file-title">Note ${String(i+1).padStart(2,'0')}</div>`).join('')}</div></div>`;
 const html=`<!doctype html><html lang="en"><meta charset="utf-8"><title>Cinematic UI — CSS preview</title><style>
 *{box-sizing:border-box} body{margin:0;background:#0c1019;color:#dfe6f2;font:16px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;--text-normal:#dfe6f2;--background-secondary:#171c28}
 .shell{padding:50px 60px}.eyebrow{color:#88b6ef;letter-spacing:3px;font-size:12px;font-weight:650}h1{font-size:54px;letter-spacing:-2px;line-height:1.1;margin:14px 0} .sub{color:#a1abc0;font-size:18px;margin:0 0 38px}.grid{display:grid;grid-template-columns:1.15fr 1fr .8fr;gap:24px}.panel{background:#121824;border:1px solid #2b3447;border-radius:18px;padding:25px;min-height:580px} h2{font-size:22px;margin:8px 0} .caption{color:#98a4b9;font-size:13px;margin-bottom:28px} .number{color:#719fd3;font:12px monospace;letter-spacing:2px}.callout{padding:15px 18px;margin:17px 0}.callout-title{font-weight:650}.callout-content{color:#d7deea;font-size:14px}.callout-content p{margin:5px 0}a{color:#99bfff;cursor:pointer}.cm-active{padding:12px;border-radius:6px;font-size:15px}.task-list-item{list-style:none;margin:19px 0;display:flex;align-items:center;gap:12px}ul{padding:0}input{accent-color:#96c5fa;width:18px;height:18px;cursor:pointer}pre{background:#1d2535;border:1px solid #334058;border-radius:10px;padding:18px;font:13px/1.8 monospace}.nav-files-container{height:394px;overflow:auto;border:1px solid #2b3447;border-radius:8px}.nav-folder-children{padding-left:8px}.nav-folder.mod-root>.nav-folder-children{padding:0}.nav-folder-title{display:flex;align-items:center;justify-content:space-between;padding:0 10px;font-size:13px}.level{font-size:10px;color:#94a3b8}.nav-file-title{height:30px;padding:3px 12px;font-size:12px;color:#9faabc}.foot{display:flex;justify-content:space-between;color:#8b98ae;font-size:12px;margin-top:30px}.tag{display:inline-block;border:1px solid #364256;border-radius:20px;padding:4px 10px;margin:20px 5px 0 0;font-size:12px;color:#acbcd2}
 </style><style>${bundle}\n${folders}</style><body class="theme-dark"><div class="shell"><div class="eyebrow">OBSIDIAN CINEMATIC UI / v1.0</div><h1>Small details. Better focus.</h1><p class="sub">Three independent CSS modules for a calmer, more expressive workspace.</p><div class="grid">
 <section class="panel"><div class="number">01 / SEMANTIC GLASS</div><h2>Meaning, in color.</h2><div class="caption">Callouts with quiet depth and breathing alerts.</div><div class="markdown-rendered"><div class="callout" data-callout="note"><div class="callout-title">Note · Capture the idea</div><div class="callout-content"><p>A clear place for the thought you want to keep.</p></div></div><div class="callout" data-callout="success"><div class="callout-title">Success · Ready to share</div><div class="callout-content"><p>One useful idea, polished and connected.</p></div></div><div class="callout" data-callout="warning"><div class="callout-title">Warning · Check the source</div><div class="callout-content"><p>A gentle pulse brings attention to what matters.</p></div></div><div class="callout" data-callout="quote"><div class="callout-title">Quote · Leave room to think</div><div class="callout-content"><p>Comfort is part of a good writing environment.</p></div></div></div></section>
 <section class="panel"><div class="number">02 / WRITING FEEDBACK</div><h2>Responds to you.</h2><div class="caption">Active-line glow, growing links, completion feedback.</div><div class="cm-editor cm-focused"><div class="cm-line cm-active">Start with one small, useful thought.</div></div><div class="markdown-rendered"><p><a id="demo-link" href="#">Follow a connection →</a></p><ul><li class="task-list-item"><input id="task" type="checkbox" aria-label="Draft one idea"><span>Draft one idea</span></li><li class="task-list-item"><input type="checkbox" aria-label="Connect another note"><span>Connect another note</span></li></ul><pre><code>capture(idea)\nconnect(context)\nshare(when_ready)</code></pre></div><span class="tag">No plugins</span><span class="tag">Reduced motion</span></section>
 <section class="panel"><div class="number">03 / FOLDER CONTEXT</div><h2>Keep your place.</h2><div class="caption">Colored, sticky ancestors while the tree scrolls.</div><div class="nav-files-container"><div class="nav-folder mod-root"><div class="nav-folder-children">${tree(0)}</div></div></div><span class="tag">Optional desktop module</span></section>
 </div><div class="foot"><span>widechaos / obsidian-cinematic-ui · MIT</span><span>Rendered CSS preview · fictional content · not an Obsidian app capture</span></div></div></body></html>`;
 fs.writeFileSync(path.join(root,'examples/preview.html'),html);
 await page.setContent(html);await page.locator('.nav-files-container').evaluate(el=>el.scrollTop=175);await page.locator('#demo-link').hover();await page.locator('#task').check();
 await page.screenshot({path:path.join(root,'assets/overview.png')});
 // Validate nested sticky positions after scrolling and motion preference support.
 const positions=await page.locator('.nav-folder:not(.mod-root) > .nav-folder-title').evaluateAll(els=>els.map(e=>e.getBoundingClientRect().top));
 for(let i=1;i<positions.length;i++)if(Math.abs(positions[i]-positions[i-1]-30)>1)throw Error('Sticky stack failed: '+positions);
 await page.emulateMedia({reducedMotion:'reduce'});
 const motion=await page.locator('[data-callout="warning"]').evaluate(el=>getComputedStyle(el).animationName);
 if(motion!=='none')throw Error('Reduced motion ignored');
 await page.emulateMedia({reducedMotion:'no-preference'});
 const c=page.locator('[data-callout="warning"]');
 fs.mkdirSync(path.join(root,'assets/frames'),{recursive:true});
 for(let i=0;i<24;i++){
  await c.evaluate((el,t)=>{el.getAnimations().forEach(a=>{a.pause();a.currentTime=t;});},i*100);
  await c.screenshot({path:path.join(root,`assets/frames/${String(i).padStart(2,'0')}.png`)});
 }
 await page.locator('body').evaluate(el=>{el.className='theme-light';el.style.background='#eef2f8';el.style.color='#182438';el.style.setProperty('--text-normal','#182438');el.style.setProperty('--background-secondary','#eef2f8');});
 await page.addStyleTag({content:'.theme-light .panel{background:#fff}.theme-light .callout-content{color:#182438}.theme-light .caption,.theme-light .nav-file-title{color:#495970}.theme-light pre{background:#edf2f9;color:#182438}'});
 await page.screenshot({path:'/tmp/cinematic-light-qa.png'});
 const probe=await browser.newPage();
 for(const file of ['cinematic-callouts.css','cinematic-writing.css','cinematic-folders.css']) {
  await probe.setContent(html.replace(`<style>${bundle}\n${folders}</style>`, ''));
  await probe.addStyleTag({content:fs.readFileSync(path.join(root,'snippets',file),'utf8')});
  if(file.includes('callouts')) {
   const a=await probe.locator('[data-callout="warning"]').evaluate(el=>getComputedStyle(el).animationName);
   if(a!=='xwc-callout-breathe')throw Error('Standalone Callouts failed');
  } else if(file.includes('writing')) {
   await probe.locator('#task').check();
   const a=await probe.locator('#task').evaluate(el=>getComputedStyle(el).animationName);
   if(a!=='xwc-task-flash')throw Error('Standalone writing failed');
  } else {
   const a=await probe.locator('.nav-folder:not(.mod-root) > .nav-folder-title').first().evaluate(el=>getComputedStyle(el).position);
   if(a!=='sticky')throw Error('Standalone folders failed');
  }
 }
 await probe.close();
 console.log(JSON.stringify({standaloneModules:'passed',stickyPositions:positions,reducedMotion:motion,preview:'assets/overview.png'}));
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
