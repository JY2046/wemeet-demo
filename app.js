const app = document.querySelector('#app');

const menu = [
  {id:'blend-americano',name:'美式',price:16,emoji:'☕',category:'意式咖啡',series:'焦糖坚果拼配',desc:'巴西 · 哥伦比亚 · 乌干达｜奶油、焦糖、黑巧、坚果',defaults:['冷 / 热']},
  {id:'blend-americano-xl',name:'1000ml 超大杯美式',price:23,emoji:'🥤',category:'意式咖啡',series:'焦糖坚果拼配',defaults:['冷']},
  {id:'blend-latte',name:'拿铁',price:23,emoji:'🥛',category:'意式咖啡',series:'焦糖坚果拼配',defaults:['冷 / 热','鲜奶']},
  {id:'blend-latte-xl',name:'1000ml 超大杯拿铁',price:34,emoji:'🥤',category:'意式咖啡',series:'焦糖坚果拼配',defaults:['冷','鲜奶']},
  {id:'blend-oat-latte',name:'燕麦拿铁',price:28,emoji:'🌾',category:'意式咖啡',series:'焦糖坚果拼配',defaults:['冷 / 热','燕麦奶']},
  {id:'blend-dirty',name:'Dirty',price:26,emoji:'🤎',category:'意式咖啡',series:'焦糖坚果拼配',defaults:['冷','鲜奶']},
  {id:'blend-coconut-latte',name:'厚椰拿铁',price:26,emoji:'🥥',category:'意式咖啡',series:'焦糖坚果拼配',defaults:['冷','厚椰乳']},
  {id:'soe-americano',name:'SOE 美式',price:23,emoji:'🌼',category:'意式咖啡',series:'SOE / 花魁',desc:'埃塞俄比亚｜茉莉花、莓果、柑橘',defaults:['冷 / 热']},
  {id:'soe-americano-xl',name:'1000ml 超大杯 SOE 美式',price:34,emoji:'🥤',category:'意式咖啡',series:'SOE / 花魁',defaults:['冷']},
  {id:'soe-latte',name:'SOE 拿铁',price:30,emoji:'🌸',category:'意式咖啡',series:'SOE / 花魁',defaults:['冷 / 热','鲜奶']},
  {id:'soe-latte-xl',name:'1000ml 超大杯 SOE 拿铁',price:42,emoji:'🥤',category:'意式咖啡',series:'SOE / 花魁',defaults:['冷','鲜奶']},
  {id:'soe-oat-latte',name:'SOE 燕麦拿铁',price:34,emoji:'🌾',category:'意式咖啡',series:'SOE / 花魁',defaults:['冷 / 热','燕麦奶']},
  {id:'soe-dirty',name:'SOE Dirty',price:32,emoji:'🤎',category:'意式咖啡',series:'SOE / 花魁',defaults:['冷','鲜奶']},
  {id:'citrus-sparkling-americano',name:'沃柑 / 接骨木 / 话梅气泡冰美式',price:28,emoji:'🍊',category:'特调咖啡',defaults:['冷','请选择风味']},
  {id:'flavored-dirty',name:'香芋 / 干姜 / 海盐玫瑰 Dirty',price:28,emoji:'💜',category:'特调咖啡',defaults:['冷','请选择风味']},
  {id:'corn-candy',name:'玉米软糖',price:32,emoji:'🌽',category:'特调咖啡',defaults:['请与咖啡师确认温度']},
  {id:'sesame-latte',name:'黑芝麻拿铁',price:32,emoji:'⚫',category:'特调咖啡',defaults:['冷 / 热']},
  {id:'apple-cream-pie',name:'苹果奶油派',price:32,emoji:'🍎',category:'特调咖啡',defaults:['请与咖啡师确认温度']},
  {id:'turmeric-cinnamon-latte',name:'姜黄肉桂拿铁',price:32,emoji:'🫚',category:'特调咖啡',defaults:['冷 / 热']},
  {id:'apple-cinnamon-latte',name:'苹果肉桂拿铁',price:32,emoji:'🍏',category:'特调咖啡',defaults:['冷 / 热']},
  {id:'coconut-candy',name:'椰子糖',price:32,emoji:'🥥',category:'特调咖啡',defaults:['请与咖啡师确认温度']},
  {id:'grape-coldbrew',name:'葡萄冰萃',price:32,emoji:'🍇',category:'特调咖啡',defaults:['冷']},
  {id:'basil-lime',name:'罗勒和青柠',price:32,emoji:'🌿',category:'特调咖啡',defaults:['冷']},
  {id:'sea-salt-cheese-latte',name:'海盐芝士拿铁',price:28,emoji:'🧀',category:'特调咖啡',defaults:['冷']},
  {id:'osmanthus-fermented-latte',name:'桂花酒酿拿铁',price:28,emoji:'🌼',category:'特调咖啡',defaults:['冷 / 热']},
  {id:'salty-mocha',name:'咸摩卡',price:28,emoji:'🍫',category:'特调咖啡',defaults:['冷 / 热']},
  {id:'green-coconut-americano',name:'青椰美式',price:26,emoji:'🌴',category:'特调咖啡',defaults:['冷']}
];

const menuExtras = ['另加双份浓缩 +5 元','SOE 双份浓缩 +8 元','换燕麦奶 +5 元'];

const signCards = [
  {word:'你好',hint:'见面时，用手语和咖啡师打个招呼。',emoji:'👋'},
  {word:'谢谢',hint:'收到咖啡后，用手语表达感谢。',emoji:'🤟'},
  {word:'很高兴认识你',hint:'第一次见面，也可以这样表达友好。',emoji:'😊'},
  {word:'咖啡很好喝',hint:'喜欢今天的咖啡，告诉咖啡师吧。',emoji:'☕'},
  {word:'下次见',hint:'离开前，和咖啡师约定下次再见。',emoji:'🙌'}
];

const quickReplies = [
  '请稍等，我正在查看','请用文字写下来','这款今天售罄了','可以为您更换其他饮品','预计还需 10 分钟','您的饮品做好了','请到取餐区取餐','我需要请同事协助'
];

const state = {
  screen:'home', modal:null, category:'全部', selected:null, freeText:'', transcript:'', parseError:'',
  recording:false, transcribing:false, recorder:null, stream:null, chunks:[],
  orders:[
    {id:'A18',source:'美团扫码',time:'14:26',status:'new',items:[{name:'SOE 拿铁',qty:1,spec:'冷 · 换燕麦奶'}],note:'打包带走，请不要吸管',alert:'新订单',changed:null,messages:[]},
    {id:'A17',source:'店内沟通',time:'14:21',status:'making',items:[{name:'桂花酒酿拿铁',qty:1,spec:'热'}],note:'',alert:'',changed:'鲜奶 → 燕麦奶',messages:['顾客 14:23：麻烦换成燕麦奶']},
    {id:'A16',source:'美团扫码',time:'14:15',status:'ready',items:[{name:'青椰美式',qty:1,spec:'冷'}],note:'',alert:'',changed:null,messages:[]}
  ],
  activeOrder:null, draftMessage:'', bigText:'', writer:'customer', signIndex:0, signStage:'choose', toast:''
};

const esc = value => String(value ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const money = n => `¥${n}`;
const statusLabel = {new:'待接单',making:'制作中',ready:'可取餐',done:'已完成'};
const product = id => menu.find(x=>x.id===id);

function render(){
  app.innerHTML = ({home:renderHome,dashboard:renderDashboard,existing:renderExisting,communicate:renderCommunicate,menu:renderMenu,confirm:renderConfirm})[state.screen]();
  renderModal();
  document.body.classList.toggle('modal-open',!!state.modal);
  if(state.toast){clearTimeout(render.toastTimer);render.toastTimer=setTimeout(()=>{state.toast='';render()},2200)}
}

function renderHome(){return `
  <section class="home-hero">
    <div class="hero-copy">
      <div class="eyebrow">ETHER COFFEE × 会意 2.0</div>
      <h1>让订单看得见，<br><span>让交流自然发生。</span></h1>
      <p class="lead">会意是叠加在现有点单流程上的无障碍工作层，帮助听障咖啡师独立接单、确认变化、回应顾客。</p>
      <div class="principle"><b>不需要说明自己的障碍</b><span>直接选择现在最方便的沟通方式，随时可以切换。</span></div>
    </div>
    <div class="home-actions">
      <button class="journey-card primary" data-action="existing">
        <span class="journey-icon">📱</span><span><small>顾客已完成点单</small><strong>我已经扫码下单</strong><em>查看订单 · 追加需求 · 取餐提醒</em></span><b>→</b>
      </button>
      <button class="journey-card" data-action="communicate">
        <span class="journey-icon">💬</span><span><small>需要面对面交流</small><strong>我需要沟通点单</strong><em>点选 · 语音字幕 · 打字 · 手写</em></span><b>→</b>
      </button>
      <button class="staff-entry" data-action="dashboard"><span>👀</span><span><b>进入咖啡师工作台</b><small>订单、改单、沟通与取餐</small></span><b>3</b></button>
    </div>
  </section>
  <section class="value-strip">
    <div><b>01</b><span>现有系统继续用</span></div><div><b>02</b><span>关键信息视觉化</span></div><div><b>03</b><span>沟通失败有退路</span></div>
  </section>`}

function renderExisting(){return `
  <section class="page-head"><button class="back" data-action="home">←</button><div><div class="eyebrow">已扫码下单</div><h2>把订单交给会意</h2><p>第一阶段不读取美团账号。请选择一种安全、简单的方式让咖啡师看到订单。</p></div></section>
  <div class="import-grid">
    <button class="import-card featured" data-action="demo-import"><span>⚡</span><b>模拟导入美团订单</b><small>使用脱敏样例，体验咖啡师接单流程</small><em>比赛演示推荐</em></button>
    <button class="import-card" data-action="manual-import"><span>⌨️</span><b>手动输入订单</b><small>只填写商品、规格和备注</small></button>
    <button class="import-card" data-action="ocr-placeholder"><span>📷</span><b>拍小票 / 截图</b><small>OCR 识别后由咖啡师确认</small><em>下一阶段</em></button>
  </div>
  <div class="privacy-note">🔒 会意只需要商品、规格、备注和状态，不需要顾客姓名、手机号或地址。</div>`}

function renderCommunicate(){return `
  <section class="page-head"><button class="back" data-action="home">←</button><div><div class="eyebrow">沟通点单</div><h2>你想怎样表达？</h2><p>随时可以切换，不需要解释原因。</p></div></section>
  <div class="mode-grid">
    <button class="mode-card" data-action="open-menu"><span>👆</span><b>点选菜单</b><small>直接选择商品与规格</small></button>
    <button class="mode-card" data-action="voice-mode"><span>🎙️</span><b>语音转字幕</b><small>说话后双方一起确认文字</small></button>
    <button class="mode-card" data-action="text-mode"><span>⌨️</span><b>直接打字</b><small>输入需求并整理为候选订单</small></button>
    <button class="mode-card" data-action="open-writing"><span>✍️</span><b>双向手写</b><small>面对面写给对方看</small></button>
  </div>
  <button class="sign-invite" data-action="open-sign"><span>🤟</span><span><b>和咖啡师学一句手语</b><small>这是轻松的互动，不影响点单</small></span><b>→</b></button>`}

function renderMenu(){
 const cats=['全部','意式咖啡','特调咖啡','手冲咖啡'];
 const items=menu.filter(x=>state.category==='全部'||x.category===state.category);
 return `<section class="page-head compact-head"><button class="back" data-action="communicate">←</button><div><div class="eyebrow">ETHER MENU</div><h2>点选菜单</h2></div></section>
 <div class="category-tabs">${cats.map(c=>`<button class="${state.category===c?'active':''}" data-category="${c}">${c}</button>`).join('')}</div>
 ${state.category==='手冲咖啡'?`<div class="pour-over-card"><span>🫘</span><div><h3>手冲咖啡</h3><p>豆单随产季更新，请直接咨询咖啡师，为您进行详细介绍。</p></div></div>`:`<div class="menu-grid">${items.map(x=>`<button class="menu-card" data-product="${x.id}"><span>${x.emoji}</span><div><b>${x.name}</b><small>${x.series?x.series+' · ':''}${x.defaults.join(' · ')}</small></div><strong>${money(x.price)}</strong></button>`).join('')}</div>`}<div class="menu-extras">${menuExtras.map(x=>`<span>${x}</span>`).join('')}</div>`
}

function renderConfirm(){
 const p=state.selected;
 if(!p){state.screen='communicate';return renderCommunicate()}
 return `<section class="page-head compact-head"><button class="back" data-action="communicate">←</button><div><div class="eyebrow">双方确认</div><h2>订单整理好了</h2></div></section>
 <div class="confirm-layout"><div class="order-paper"><div class="paper-top"><span>ETHER COFFEE</span><b>候选订单</b></div><div class="confirm-product"><span>${p.emoji}</span><div><h3>${p.name} × 1</h3><p>${esc(p.spec||p.defaults.join(' · '))}</p></div><b>${money(p.price)}</b></div>${state.freeText?`<div class="raw-text"><small>顾客原始表达</small><p>“${esc(state.freeText)}”</p></div>`:''}<div class="double-check">👀 请顾客和咖啡师一起确认，AI 不会替双方做决定。</div></div>
 <div class="confirm-actions"><button class="secondary" data-action="communicate">返回修改</button><button class="primary-button" data-action="submit-order">双方确认，发送到工作台</button></div></div>`
}

function renderDashboard(){
 const active=state.activeOrder?state.orders.find(o=>o.id===state.activeOrder):null;
 return `<section class="dashboard-head"><div><div class="eyebrow">听障咖啡师工作台</div><h2>下午好，星星</h2><p>重要变化会用文字、颜色和震动提示，不只依靠声音。</p></div><div class="shift-state"><i></i> 服务中</div></section>
 <div class="dashboard-tools"><button data-action="demo-import">＋ 模拟导入订单</button><button data-action="open-replies">💬 快捷回复</button><button data-action="open-writing">✍️ 手写板</button><button data-action="open-help">🫶 沟通求助</button></div>
 <div class="order-board">${['new','making','ready'].map(status=>renderColumn(status)).join('')}</div>
 ${active?renderOrderDrawer(active):''}`
}

function renderColumn(status){
 const labels={new:['待接单','先看备注与变化'],making:['制作中','保持追加需求可见'],ready:['可取餐','用视觉方式通知']};
 const orders=state.orders.filter(o=>o.status===status);
 return `<section class="order-column"><header><div><h3>${labels[status][0]} <b>${orders.length}</b></h3><p>${labels[status][1]}</p></div></header><div class="order-list">${orders.length?orders.map(renderOrderCard).join(''):'<div class="empty-state">当前没有订单</div>'}</div></section>`
}

function renderOrderCard(o){return `<button class="order-card ${o.alert?'has-alert':''} ${o.changed?'has-change':''}" data-order="${o.id}">
 <div class="order-meta"><b>#${o.id}</b><span>${o.source}</span><time>${o.time}</time></div>
 ${o.alert?`<div class="alert-ribbon">● ${o.alert} · 请确认已看到</div>`:''}
 ${o.items.map(i=>`<div class="order-item"><strong>${i.name} × ${i.qty}</strong><small>${i.spec}</small></div>`).join('')}
 ${o.note?`<div class="order-note"><b>备注</b>${esc(o.note)}</div>`:''}
 ${o.changed?`<div class="order-change"><b>订单有修改</b><span>${esc(o.changed)}</span></div>`:''}
 ${o.messages.length?`<div class="message-count">💬 ${o.messages.length} 条追加沟通</div>`:''}
 <footer><span>查看详情</span><b>→</b></footer></button>`}

function renderOrderDrawer(o){
 const next={new:['确认接单','making'],making:['制作完成','ready'],ready:['确认取餐','done']}[o.status];
 return `<div class="drawer-backdrop" data-action="close-order"></div><aside class="order-drawer"><button class="drawer-close" data-action="close-order">×</button><div class="eyebrow">订单 #${o.id}</div><h2>${statusLabel[o.status]}</h2>
 <div class="drawer-source">${o.source} · ${o.time}</div>${o.items.map(i=>`<div class="drawer-item"><b>${i.name} × ${i.qty}</b><span>${i.spec}</span></div>`).join('')}
 ${o.note?`<div class="drawer-block important"><small>顾客备注</small><b>${esc(o.note)}</b></div>`:''}${o.changed?`<div class="drawer-block change"><small>刚刚修改</small><b>${esc(o.changed)}</b></div>`:''}
 <div class="conversation"><h3>与顾客沟通</h3>${o.messages.map(m=>`<p>${esc(m)}</p>`).join('')||'<p class="muted">还没有追加消息</p>'}<div class="message-compose"><input id="order-message" value="${esc(state.draftMessage)}" placeholder="输入给顾客的文字"/><button data-action="send-message">发送</button></div></div>
 <div class="drawer-quick">${quickReplies.slice(0,4).map(q=>`<button data-quick="${q}">${q}</button>`).join('')}</div>
 <button class="primary-button full" data-status="${next?.[1]||''}" ${next?'':'disabled'}>${next?.[0]||'订单已完成'}</button></aside>`
}

function renderModal(){
 let html='';
 if(state.modal==='input') html=renderInputModal();
 if(state.modal==='toolbox') html=renderToolbox();
 if(state.modal==='writing') html=renderWriting();
 if(state.modal==='bigtext') html=renderBigText();
 if(state.modal==='sign') html=renderSign();
 if(state.modal==='replies') html=renderReplies();
 if(state.modal==='help') html=renderHelp();
 if(state.modal==='manual') html=renderManual();
 const old=document.querySelector('#modal-root');if(old)old.remove();
 if(html){const root=document.createElement('div');root.id='modal-root';root.innerHTML=html;document.body.appendChild(root);if(state.modal==='writing')setTimeout(initCanvas,0)}
 const oldToast=document.querySelector('.toast');if(oldToast)oldToast.remove();
 if(state.toast){const t=document.createElement('div');t.className='toast';t.textContent=state.toast;document.body.appendChild(t)}
}

const modalShell=(title,body,wide=false)=>`<div class="modal-backdrop" data-action="close-modal"></div><section class="modal ${wide?'wide':''}" role="dialog" aria-modal="true"><header><div><div class="eyebrow">无障碍沟通</div><h2>${title}</h2></div><button data-action="close-modal" aria-label="关闭">×</button></header>${body}</section>`;

function renderInputModal(){return modalShell(state.inputKind==='voice'?'语音转字幕':'直接输入文字',`
 <div class="live-caption"><small>双方都能看到的文字</small><textarea id="free-text" placeholder="例如：一杯 SOE 燕麦拿铁，冷的，打包带走">${esc(state.freeText)}</textarea></div>
 ${state.parseError?`<div class="error-box">${esc(state.parseError)}</div>`:''}
 ${state.inputKind==='voice'?`<button class="record-button ${state.recording?'recording':''}" data-action="record">${state.transcribing?'正在转写…':state.recording?'■ 结束录音':'● 开始录音'}</button><p class="modal-tip">录音只在你主动操作后上传用于转写，不在浏览器中长期保存。</p>`:''}
 <div class="modal-actions"><button class="secondary" data-action="open-writing">改用手写</button><button class="primary-button" data-action="parse-order">整理为候选订单</button></div>`)}

function renderToolbox(){return modalShell('选择现在最方便的方式',`<p class="modal-lead">不需要解释原因，任何时候都可以切换。</p><div class="tool-grid"><button data-action="text-mode"><span>⌨️</span><b>文字输入</b></button><button data-action="voice-mode"><span>🎙️</span><b>语音字幕</b></button><button data-action="open-writing"><span>✍️</span><b>双向手写</b></button><button data-action="open-bigtext"><span>🔤</span><b>全屏大字</b></button><button data-action="open-replies"><span>💬</span><b>快捷回复</b></button><button data-action="open-help"><span>🫶</span><b>沟通求助</b></button></div><button class="sign-invite compact-sign" data-action="open-sign"><span>🤟</span><span><b>和咖啡师学一句手语</b><small>友好互动，不用于处理订单</small></span><b>→</b></button>`)}

function renderWriting(){return modalShell('双向手写板',`<div class="writer-toggle"><button class="${state.writer==='customer'?'active':''}" data-writer="customer">顾客写给咖啡师</button><button class="${state.writer==='barista'?'active':''}" data-writer="barista">咖啡师写给顾客</button></div><div class="canvas-wrap"><canvas id="write-canvas"></canvas><span>请在这里写字或画图</span></div><div class="modal-actions"><button class="secondary" data-action="clear-canvas">清屏</button><button class="secondary" data-action="open-bigtext">改用大字</button><button class="primary-button" data-action="writing-done">写好了，给对方看</button></div>`,true)}

function renderBigText(){return modalShell('全屏大字',`<textarea id="big-text-input" class="big-input" placeholder="输入一句话">${esc(state.bigText)}</textarea><div class="phrase-row">${['请稍等','请写下来','已经售罄','饮品做好了'].map(x=>`<button data-big="${x}">${x}</button>`).join('')}</div><button class="primary-button full" data-action="show-bigtext">全屏展示给对方</button>`)}

function renderSign(){
 const c=signCards[state.signIndex];
 return modalShell('和咖啡师学一句手语',`<div class="sign-note">这是人与人的轻松互动，不用于订单确认或异常处理。</div><div class="sign-card"><span class="sign-emoji">${c.emoji}</span><small>今天的一句</small><h2>${c.word}</h2><p>${c.hint}</p><div class="sign-demo"><span>🤲</span><div><b>请咖啡师现场示范</b><small>看懂文字后，跟着咖啡师一起比划</small></div></div></div><div class="sign-actions"><button class="secondary" data-action="next-sign">换一句</button><button class="primary-button" data-action="try-sign">${state.signStage==='try'?'我学会了':'我来试试看'}</button></div>${state.signStage==='try'?'<div class="barista-feedback">咖啡师：我再慢慢示范一次，你跟着我就好 😊</div>':''}`)}

function renderReplies(){return modalShell('咖啡师快捷回复',`<p class="modal-lead">点击一句话，可选择全屏展示给顾客。</p><div class="reply-list">${quickReplies.map(x=>`<button data-reply="${x}"><span>${x}</span><b>显示 →</b></button>`).join('')}</div>`)}
function renderHelp(){return modalShell('沟通遇到困难',`<p class="modal-lead">不是谁做错了。换一种方式继续就好。</p><div class="help-grid"><button data-action="text-mode">⌨️ 换成文字</button><button data-action="open-writing">✍️ 使用手写板</button><button data-action="open-bigtext">🔤 全屏大字</button><button data-action="voice-mode">🎙️ 再说一次</button><button data-action="ask-slow">🐢 请放慢表达</button><button data-action="ask-colleague">🫶 请同事协助</button></div>`)}
function renderManual(){return modalShell('手动录入现有订单',`<label class="field">商品名称<input id="manual-product" placeholder="例如：桂花酒酿拿铁"/></label><label class="field">规格<input id="manual-spec" placeholder="例如：冷、少冰、不另外加糖"/></label><label class="field">备注<textarea id="manual-note" placeholder="例如：打包带走"></textarea></label><button class="primary-button full" data-action="save-manual">发送到咖啡师工作台</button>`)}

function detectProduct(text){
 const t=text.toLowerCase().replace(/[\s，。,.！？!?]/g,'');
 const aliases=[
  ['soe-americano-xl',['1000ml超大杯soe美式','超大杯soe美式']],['soe-latte-xl',['1000ml超大杯soe拿铁','超大杯soe拿铁']],
  ['blend-americano-xl',['1000ml超大杯美式','超大杯美式']],['blend-latte-xl',['1000ml超大杯拿铁','超大杯拿铁']],
  ['soe-oat-latte',['soe燕麦拿铁','花魁燕麦拿铁']],['soe-latte',['soe拿铁','花魁拿铁']],['soe-americano',['soe美式','花魁美式']],['soe-dirty',['soedirty','花魁dirty']],
  ['blend-coconut-latte',['厚椰拿铁']],['blend-oat-latte',['燕麦拿铁']],['blend-dirty',['dirty','迪提','迪缇']],
  ['citrus-sparkling-americano',['沃柑气泡冰美式','接骨木气泡冰美式','话梅气泡冰美式','气泡冰美式']],
  ['flavored-dirty',['香芋dirty','干姜dirty','海盐玫瑰dirty']],['corn-candy',['玉米软糖']],['sesame-latte',['黑芝麻拿铁']],
  ['apple-cream-pie',['苹果奶油派']],['turmeric-cinnamon-latte',['姜黄肉桂拿铁']],['apple-cinnamon-latte',['苹果肉桂拿铁']],
  ['coconut-candy',['椰子糖']],['grape-coldbrew',['葡萄冰萃']],['basil-lime',['罗勒和青柠','罗勒青柠']],
  ['sea-salt-cheese-latte',['海盐芝士拿铁']],['osmanthus-fermented-latte',['桂花酒酿拿铁']],['salty-mocha',['咸摩卡']],['green-coconut-americano',['青椰美式']],
  ['blend-americano',['美式']],['blend-latte',['拿铁']]
 ];
 for(const [id,words] of aliases)if(words.some(w=>t.includes(w)))return product(id);
 return null;
}

function parseOrder(){
 const box=document.querySelector('#free-text');if(box)state.freeText=box.value.trim();
 const p=detectProduct(state.freeText);state.parseError='';
 if(!p){state.parseError='没有识别到明确商品。请说出完整名称，或改用点选菜单。';render();return}
 let specs=[...p.defaults];const t=state.freeText;
 if(t.includes('少冰'))specs=specs.map(x=>x.includes('冰')?'少冰':x);if(t.includes('去冰')||t.includes('不要冰'))specs=specs.map(x=>x.includes('冰')?'去冰':x);
 if(t.includes('少糖'))specs=specs.map(x=>x.includes('糖')?'少糖':x);if(t.includes('无糖')||t.includes('不加糖'))specs=specs.map(x=>x.includes('糖')?'不另外加糖':x);
 state.selected={...p,spec:specs.join(' · ')};state.modal=null;state.screen='confirm';render();
}

async function toggleRecord(){
 if(state.recording){state.recorder.stop();state.stream?.getTracks().forEach(t=>t.stop());state.recording=false;state.transcribing=true;render();return}
 try{
  const stream=await navigator.mediaDevices.getUserMedia({audio:true});state.stream=stream;state.chunks=[];
  const recorder=new MediaRecorder(stream);state.recorder=recorder;recorder.ondataavailable=e=>{if(e.data.size)state.chunks.push(e.data)};
  recorder.onstop=async()=>{try{const blob=new Blob(state.chunks,{type:recorder.mimeType||'audio/webm'});const form=new FormData();form.append('audio',blob,'wemeet-recording.webm');const r=await fetch('/api/transcribe',{method:'POST',body:form,headers:{'X-WeMeet-Consent':'user-initiated'}});const data=await r.json();if(!r.ok||!data.ok)throw new Error();state.freeText=data.text||'';state.transcribing=false;state.modal='input';render()}catch(e){state.transcribing=false;state.toast='转写失败，请改用文字或手写';render()}};
  recorder.start();state.recording=true;render();
 }catch(e){state.toast='无法使用麦克风，请检查权限或改用文字';render()}
}

function addDemoOrder(){
 const n=state.orders.find(o=>o.id==='A19');if(!n)state.orders.unshift({id:'A19',source:'美团订单 · 模拟',time:new Date().toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit'}),status:'new',items:[{name:'SOE 燕麦拿铁',qty:1,spec:'冷 · 燕麦奶'}],note:'不要吸管，到店自取',alert:'新订单',changed:null,messages:[]});
 state.screen='dashboard';state.modal=null;state.toast='新订单已导入，工作台已发出视觉提醒';if(n)state.activeOrder='A19';navigator.vibrate?.([120,80,120]);render();
}

function initCanvas(){
 const canvas=document.querySelector('#write-canvas');if(!canvas)return;const box=canvas.parentElement.getBoundingClientRect();canvas.width=box.width*devicePixelRatio;canvas.height=300*devicePixelRatio;canvas.style.height='300px';const ctx=canvas.getContext('2d');ctx.scale(devicePixelRatio,devicePixelRatio);ctx.lineWidth=5;ctx.lineCap='round';ctx.strokeStyle='#25332d';let drawing=false;
 const pos=e=>{const r=canvas.getBoundingClientRect(),p=e.touches?.[0]||e;return [p.clientX-r.left,p.clientY-r.top]};
 const start=e=>{drawing=true;ctx.beginPath();ctx.moveTo(...pos(e));e.preventDefault()};const move=e=>{if(!drawing)return;ctx.lineTo(...pos(e));ctx.stroke();e.preventDefault()};const stop=()=>drawing=false;
 ['mousedown','touchstart'].forEach(x=>canvas.addEventListener(x,start,{passive:false}));['mousemove','touchmove'].forEach(x=>canvas.addEventListener(x,move,{passive:false}));['mouseup','mouseleave','touchend'].forEach(x=>canvas.addEventListener(x,stop));
}

function handleAction(a,el){
 const routes={home:'home',existing:'existing',communicate:'communicate',dashboard:'dashboard','open-menu':'menu'};if(routes[a]){state.screen=routes[a];state.modal=null;render();return}
 if(a==='reset'){Object.assign(state,{screen:'home',modal:null,selected:null,freeText:'',parseError:'',activeOrder:null});render()}
 if(a==='demo-import')addDemoOrder();
 if(a==='manual-import'){state.modal='manual';render()}
 if(a==='ocr-placeholder'){state.toast='OCR 将在下一阶段接入，当前请使用模拟导入';render()}
 if(a==='voice-mode'||a==='text-mode'){state.inputKind=a==='voice-mode'?'voice':'text';state.modal='input';render()}
 if(a==='open-toolbox'){state.modal='toolbox';render()}
 if(a==='open-writing'){state.modal='writing';render()}
 if(a==='open-bigtext'){state.modal='bigtext';render()}
 if(a==='open-sign'){state.modal='sign';state.signStage='choose';render()}
 if(a==='open-replies'){state.modal='replies';render()}
 if(a==='open-help'){state.modal='help';render()}
 if(a==='close-modal'){state.modal=null;render()}
 if(a==='parse-order')parseOrder();
 if(a==='record')toggleRecord();
 if(a==='submit-order'){const p=state.selected;state.orders.unshift({id:'A20',source:'店内沟通',time:new Date().toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit'}),status:'new',items:[{name:p.name,qty:1,spec:p.spec||p.defaults.join(' · ')}],note:state.freeText,alert:'双方已确认',changed:null,messages:[]});state.screen='dashboard';state.toast='订单已发送到咖啡师工作台';render()}
 if(a==='close-order'){state.activeOrder=null;render()}
 if(a==='send-message'){const input=document.querySelector('#order-message');const o=state.orders.find(x=>x.id===state.activeOrder);if(input?.value.trim()){o.messages.push(`咖啡师 ${new Date().toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit'})}：${input.value.trim()}`);state.draftMessage='';state.toast='文字已展示给顾客';render()}}
 if(a==='clear-canvas'){initCanvas()}
 if(a==='writing-done'){state.toast=`${state.writer==='customer'?'顾客':'咖啡师'}的手写内容已展示给对方`;state.modal=null;render()}
 if(a==='show-bigtext'){const input=document.querySelector('#big-text-input');state.bigText=input?.value.trim()||state.bigText;if(state.bigText){document.body.innerHTML=`<button class="big-display" data-return-big><span>${esc(state.bigText)}</span><small>轻触屏幕返回</small></button>`}}
 if(a==='next-sign'){state.signIndex=(state.signIndex+1)%signCards.length;state.signStage='choose';render()}
 if(a==='try-sign'){if(state.signStage==='choose'){state.signStage='try';render()}else{state.toast=`今天学会了“${signCards[state.signIndex].word}”`;state.modal=null;render()}}
 if(a==='ask-slow'){state.bigText='请放慢一点，让我看清楚。';state.modal='bigtext';render()}
 if(a==='ask-colleague'){state.bigText='沟通暂时遇到困难，我请同事一起协助。';state.modal='bigtext';render()}
 if(a==='save-manual'){const name=document.querySelector('#manual-product')?.value.trim(),spec=document.querySelector('#manual-spec')?.value.trim(),note=document.querySelector('#manual-note')?.value.trim();if(!name){state.toast='请先填写商品名称';render();return}state.orders.unshift({id:'A21',source:'人工录入',time:new Date().toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit'}),status:'new',items:[{name,qty:1,spec:spec||'待确认'}],note,alert:'新订单',changed:null,messages:[]});state.modal=null;state.screen='dashboard';state.toast='订单已录入工作台';render()}
}

document.addEventListener('click',e=>{
 const action=e.target.closest('[data-action]');if(action){handleAction(action.dataset.action,action);return}
 const p=e.target.closest('[data-product]');if(p){state.selected={...product(p.dataset.product)};state.screen='confirm';render();return}
 const cat=e.target.closest('[data-category]');if(cat){state.category=cat.dataset.category;render();return}
 const order=e.target.closest('[data-order]');if(order){state.activeOrder=order.dataset.order;const o=state.orders.find(x=>x.id===state.activeOrder);o.alert='';render();return}
 const status=e.target.closest('[data-status]');if(status&&status.dataset.status){const o=state.orders.find(x=>x.id===state.activeOrder);o.status=status.dataset.status;if(o.status==='ready')o.messages.push('系统：已向顾客显示取餐提醒');if(o.status==='done')state.activeOrder=null;state.toast=`订单已更新为${statusLabel[o.status]}`;render();return}
 const quick=e.target.closest('[data-quick]');if(quick){state.draftMessage=quick.dataset.quick;render();return}
 const reply=e.target.closest('[data-reply]');if(reply){state.bigText=reply.dataset.reply;state.modal='bigtext';render();return}
 const big=e.target.closest('[data-big]');if(big){state.bigText=big.dataset.big;render();return}
 const writer=e.target.closest('[data-writer]');if(writer){state.writer=writer.dataset.writer;render();return}
 if(e.target.closest('[data-return-big]'))location.reload();
});

document.addEventListener('input',e=>{if(e.target.id==='free-text')state.freeText=e.target.value;if(e.target.id==='big-text-input')state.bigText=e.target.value;if(e.target.id==='order-message')state.draftMessage=e.target.value});

const floating=document.createElement('button');floating.className='floating-access';floating.dataset.action='open-toolbox';floating.innerHTML='<span>🤟</span><b>无障碍沟通</b>';document.body.appendChild(floating);
render();
