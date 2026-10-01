import{A as Ye,B as We,C as Je,D as Ze,E as et,c as Ve,d as Pe,e as Le,f as He,g as Oe,h as $e,i as qe,m as Ue,n as Qe,o as j,p as q,t as g,v as Xe,y as Ke,z as Ge}from"./chunk-YNSBZDBF.js";import{L as je,M as y,R as F,U as se,b as re,c as oe,e as Ae,f as Be,g as $,m as Re,n as Fe}from"./chunk-JJGPEVPX.js";import"./chunk-PT2JM3JA.js";import{$a as T,Ca as J,Cb as Ne,Db as _,Ea as Ee,Eb as l,Fb as f,Gb as ie,Kb as R,Lb as ze,Na as N,Oa as z,Ob as ge,P as C,Pa as Me,Pb as fe,Q as I,Qb as he,Ra as A,S as D,Sa as B,Ta as E,U as m,Vb as P,Wb as xe,Yb as ae,Z as S,Za as M,_ as w,_a as k,a as ce,aa as Se,ab as ke,ac as O,b as pe,bb as Z,cb as ee,db as d,eb as r,fb as o,ga as x,gb as c,ka as b,kb as Te,lb as Ie,nb as H,rb as v,sb as p,tb as te,ub as ne,va as we,vb as me,wb as De,xa as s,xb as G,yb as Y,zb as ue}from"./chunk-S7RLCFAW.js";var tt=`
    .p-avatar {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: dt('avatar.width');
        height: dt('avatar.height');
        font-size: dt('avatar.font.size');
        background: dt('avatar.background');
        color: dt('avatar.color');
        border-radius: dt('avatar.border.radius');
    }

    .p-avatar-image {
        background: transparent;
    }

    .p-avatar-circle {
        border-radius: 50%;
    }

    .p-avatar-circle img {
        border-radius: 50%;
    }

    .p-avatar-icon {
        font-size: dt('avatar.icon.size');
        width: dt('avatar.icon.size');
        height: dt('avatar.icon.size');
    }

    .p-avatar img {
        width: 100%;
        height: 100%;
    }

    .p-avatar-lg {
        width: dt('avatar.lg.width');
        height: dt('avatar.lg.width');
        font-size: dt('avatar.lg.font.size');
    }

    .p-avatar-lg .p-avatar-icon {
        font-size: dt('avatar.lg.icon.size');
        width: dt('avatar.lg.icon.size');
        height: dt('avatar.lg.icon.size');
    }

    .p-avatar-xl {
        width: dt('avatar.xl.width');
        height: dt('avatar.xl.width');
        font-size: dt('avatar.xl.font.size');
    }

    .p-avatar-xl .p-avatar-icon {
        font-size: dt('avatar.xl.icon.size');
        width: dt('avatar.xl.icon.size');
        height: dt('avatar.xl.icon.size');
    }

    .p-avatar-group {
        display: flex;
        align-items: center;
    }

    .p-avatar-group .p-avatar + .p-avatar {
        margin-inline-start: dt('avatar.group.offset');
    }

    .p-avatar-group .p-avatar {
        border: 2px solid dt('avatar.group.border.color');
    }

    .p-avatar-group .p-avatar-lg + .p-avatar-lg {
        margin-inline-start: dt('avatar.lg.group.offset');
    }

    .p-avatar-group .p-avatar-xl + .p-avatar-xl {
        margin-inline-start: dt('avatar.xl.group.offset');
    }
`;var Ct=["*"];function St(e,i){if(e&1&&(r(0,"span",3),l(1),o()),e&2){let t=p();_(t.cx("label")),d("pBind",t.ptm("label")),s(),f(t.label)}}function wt(e,i){if(e&1&&c(0,"span",5),e&2){let t=p(2);_(t.icon),d("pBind",t.ptm("icon"))("ngClass",t.cx("icon"))}}function Et(e,i){if(e&1&&E(0,wt,1,4,"span",4),e&2){let t=p(),n=ue(5);d("ngIf",t.icon)("ngIfElse",n)}}function Mt(e,i){if(e&1){let t=H();r(0,"img",7),v("error",function(a){S(t);let u=p(2);return w(u.imageError(a))}),o()}if(e&2){let t=p(2);d("pBind",t.ptm("image"))("src",t.image,we),M("aria-label",t.ariaLabel)}}function kt(e,i){if(e&1&&E(0,Mt,1,3,"img",6),e&2){let t=p();d("ngIf",t.image)}}var Tt={root:({instance:e})=>["p-avatar p-component",{"p-avatar-image":e.image!=null,"p-avatar-circle":e.shape==="circle","p-avatar-lg":e.size==="large","p-avatar-xl":e.size==="xlarge"}],label:"p-avatar-label",icon:"p-avatar-icon"},nt=(()=>{class e extends F{name="avatar";style=tt;classes=Tt;static \u0275fac=(()=>{let t;return function(a){return(t||(t=b(e)))(a||e)}})();static \u0275prov=C({token:e,factory:e.\u0275fac})}return e})();var it=new D("AVATAR_INSTANCE"),_e=(()=>{class e extends q{$pcAvatar=m(it,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=m(g,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}label;icon;image;size="normal";shape="square";styleClass;ariaLabel;ariaLabelledBy;onImageError=new J;_componentStyle=m(nt);imageError(t){this.onImageError.emit(t)}static \u0275fac=(()=>{let t;return function(a){return(t||(t=b(e)))(a||e)}})();static \u0275cmp=N({type:e,selectors:[["p-avatar"]],hostVars:4,hostBindings:function(n,a){n&2&&(M("aria-label",a.ariaLabel)("aria-labelledby",a.ariaLabelledBy),_(a.cn(a.cx("root"),a.styleClass)))},inputs:{label:"label",icon:"icon",image:"image",size:"size",shape:"shape",styleClass:"styleClass",ariaLabel:"ariaLabel",ariaLabelledBy:"ariaLabelledBy"},outputs:{onImageError:"onImageError"},features:[R([nt,{provide:it,useExisting:e},{provide:j,useExisting:e}]),B([g]),A],ngContentSelectors:Ct,decls:6,vars:2,consts:[["iconTemplate",""],["imageTemplate",""],[3,"pBind","class",4,"ngIf","ngIfElse"],[3,"pBind"],[3,"pBind","class","ngClass",4,"ngIf","ngIfElse"],[3,"pBind","ngClass"],[3,"pBind","src","error",4,"ngIf"],[3,"error","pBind","src"]],template:function(n,a){if(n&1&&(te(),ne(0),E(1,St,2,4,"span",2)(2,Et,1,2,"ng-template",null,0,he)(4,kt,1,1,"ng-template",null,1,he)),n&2){let u=ue(3);s(),d("ngIf",a.label)("ngIfElse",u)}},dependencies:[$,re,oe,y,g],encapsulation:2,changeDetection:0})}return e})(),at=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=z({type:e});static \u0275inj=I({imports:[_e,y,y]})}return e})();var rt=`
    .p-textarea {
        font-family: inherit;
        font-feature-settings: inherit;
        font-size: 1rem;
        color: dt('textarea.color');
        background: dt('textarea.background');
        padding-block: dt('textarea.padding.y');
        padding-inline: dt('textarea.padding.x');
        border: 1px solid dt('textarea.border.color');
        transition:
            background dt('textarea.transition.duration'),
            color dt('textarea.transition.duration'),
            border-color dt('textarea.transition.duration'),
            outline-color dt('textarea.transition.duration'),
            box-shadow dt('textarea.transition.duration');
        appearance: none;
        border-radius: dt('textarea.border.radius');
        outline-color: transparent;
        box-shadow: dt('textarea.shadow');
    }

    .p-textarea:enabled:hover {
        border-color: dt('textarea.hover.border.color');
    }

    .p-textarea:enabled:focus {
        border-color: dt('textarea.focus.border.color');
        box-shadow: dt('textarea.focus.ring.shadow');
        outline: dt('textarea.focus.ring.width') dt('textarea.focus.ring.style') dt('textarea.focus.ring.color');
        outline-offset: dt('textarea.focus.ring.offset');
    }

    .p-textarea.p-invalid {
        border-color: dt('textarea.invalid.border.color');
    }

    .p-textarea.p-variant-filled {
        background: dt('textarea.filled.background');
    }

    .p-textarea.p-variant-filled:enabled:hover {
        background: dt('textarea.filled.hover.background');
    }

    .p-textarea.p-variant-filled:enabled:focus {
        background: dt('textarea.filled.focus.background');
    }

    .p-textarea:disabled {
        opacity: 1;
        background: dt('textarea.disabled.background');
        color: dt('textarea.disabled.color');
    }

    .p-textarea::placeholder {
        color: dt('textarea.placeholder.color');
    }

    .p-textarea.p-invalid::placeholder {
        color: dt('textarea.invalid.placeholder.color');
    }

    .p-textarea-fluid {
        width: 100%;
    }

    .p-textarea-resizable {
        overflow: hidden;
        resize: none;
    }

    .p-textarea-sm {
        font-size: dt('textarea.sm.font.size');
        padding-block: dt('textarea.sm.padding.y');
        padding-inline: dt('textarea.sm.padding.x');
    }

    .p-textarea-lg {
        font-size: dt('textarea.lg.font.size');
        padding-block: dt('textarea.lg.padding.y');
        padding-inline: dt('textarea.lg.padding.x');
    }
`;var Dt=`
    ${rt}

    /* For PrimeNG */
    .p-textarea.ng-invalid.ng-dirty {
        border-color: dt('textarea.invalid.border.color');
    }
    .p-textarea.ng-invalid.ng-dirty::placeholder {
        color: dt('textarea.invalid.placeholder.color');
    }
`,Nt={root:({instance:e})=>["p-textarea p-component",{"p-filled":e.$filled(),"p-textarea-resizable ":e.autoResize,"p-variant-filled":e.$variant()==="filled","p-textarea-fluid":e.hasFluid,"p-inputfield-sm p-textarea-sm":e.pSize==="small","p-textarea-lg p-inputfield-lg":e.pSize==="large","p-invalid":e.invalid()}]},ot=(()=>{class e extends F{name="textarea";style=Dt;classes=Nt;static \u0275fac=(()=>{let t;return function(a){return(t||(t=b(e)))(a||e)}})();static \u0275prov=C({token:e,factory:e.\u0275fac})}return e})();var st=new D("TEXTAREA_INSTANCE"),lt=(()=>{class e extends Ye{bindDirectiveInstance=m(g,{self:!0});$pcTextarea=m(st,{optional:!0,skipSelf:!0})??void 0;autoResize;pSize;variant=ae();fluid=ae(void 0,{transform:O});invalid=ae(void 0,{transform:O});$variant=P(()=>this.variant()||this.config.inputStyle()||this.config.inputVariant());onResize=new J;ngControlSubscription;_componentStyle=m(ot);ngControl=m(Pe,{optional:!0,self:!0});pcFluid=m(Xe,{optional:!0,host:!0,skipSelf:!0});get hasFluid(){return this.fluid()??!!this.pcFluid}onInit(){this.ngControl&&(this.ngControlSubscription=this.ngControl.valueChanges.subscribe(()=>{this.updateState()}))}onAfterViewInit(){this.autoResize&&this.resize(),this.cd.detectChanges()}onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"])),this.autoResize&&this.resize(),this.writeModelValue(this.ngControl?.value??this.el.nativeElement.value)}onInput(t){this.writeModelValue(t.target?.value),this.updateState()}resize(t){this.el.nativeElement.style.height="auto",this.el.nativeElement.style.height=this.el.nativeElement.scrollHeight+"px",parseFloat(this.el.nativeElement.style.height)>=parseFloat(this.el.nativeElement.style.maxHeight)?(this.el.nativeElement.style.overflowY="scroll",this.el.nativeElement.style.height=this.el.nativeElement.style.maxHeight):this.el.nativeElement.style.overflow="hidden",this.onResize.emit(t||{})}updateState(){this.autoResize&&this.resize()}onDestroy(){this.ngControlSubscription&&this.ngControlSubscription.unsubscribe()}static \u0275fac=(()=>{let t;return function(a){return(t||(t=b(e)))(a||e)}})();static \u0275dir=Me({type:e,selectors:[["","pTextarea",""],["","pInputTextarea",""]],hostVars:2,hostBindings:function(n,a){n&1&&v("input",function(h){return a.onInput(h)}),n&2&&_(a.cx("root"))},inputs:{autoResize:[2,"autoResize","autoResize",O],pSize:"pSize",variant:[1,"variant"],fluid:[1,"fluid"],invalid:[1,"invalid"]},outputs:{onResize:"onResize"},features:[R([ot,{provide:st,useExisting:e},{provide:j,useExisting:e}]),B([g]),A]})}return e})(),dt=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=z({type:e});static \u0275inj=I({})}return e})();var ct=`
    .p-tag {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: dt('tag.primary.background');
        color: dt('tag.primary.color');
        font-size: dt('tag.font.size');
        font-weight: dt('tag.font.weight');
        padding: dt('tag.padding');
        border-radius: dt('tag.border.radius');
        gap: dt('tag.gap');
    }

    .p-tag-icon {
        font-size: dt('tag.icon.size');
        width: dt('tag.icon.size');
        height: dt('tag.icon.size');
    }

    .p-tag-rounded {
        border-radius: dt('tag.rounded.border.radius');
    }

    .p-tag-success {
        background: dt('tag.success.background');
        color: dt('tag.success.color');
    }

    .p-tag-info {
        background: dt('tag.info.background');
        color: dt('tag.info.color');
    }

    .p-tag-warn {
        background: dt('tag.warn.background');
        color: dt('tag.warn.color');
    }

    .p-tag-danger {
        background: dt('tag.danger.background');
        color: dt('tag.danger.color');
    }

    .p-tag-secondary {
        background: dt('tag.secondary.background');
        color: dt('tag.secondary.color');
    }

    .p-tag-contrast {
        background: dt('tag.contrast.background');
        color: dt('tag.contrast.color');
    }
`;var At=["icon"],Bt=["*"];function Rt(e,i){if(e&1&&c(0,"span",4),e&2){let t=p(2);_(t.cx("icon")),d("ngClass",t.icon)("pBind",t.ptm("icon"))}}function Ft(e,i){if(e&1&&(Te(0),E(1,Rt,1,4,"span",3),Ie()),e&2){let t=p();s(),d("ngIf",t.icon)}}function jt(e,i){}function Vt(e,i){e&1&&E(0,jt,0,0,"ng-template")}function Pt(e,i){if(e&1&&(r(0,"span",2),E(1,Vt,1,0,null,5),o()),e&2){let t=p();_(t.cx("icon")),d("pBind",t.ptm("icon")),s(),d("ngTemplateOutlet",t.iconTemplate||t._iconTemplate)}}var Lt={root:({instance:e})=>["p-tag p-component",{"p-tag-info":e.severity==="info","p-tag-success":e.severity==="success","p-tag-warn":e.severity==="warn","p-tag-danger":e.severity==="danger","p-tag-secondary":e.severity==="secondary","p-tag-contrast":e.severity==="contrast","p-tag-rounded":e.rounded}],icon:"p-tag-icon",label:"p-tag-label"},pt=(()=>{class e extends F{name="tag";style=ct;classes=Lt;static \u0275fac=(()=>{let t;return function(a){return(t||(t=b(e)))(a||e)}})();static \u0275prov=C({token:e,factory:e.\u0275fac})}return e})();var mt=new D("TAG_INSTANCE"),be=(()=>{class e extends q{$pcTag=m(mt,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=m(g,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}styleClass;severity;value;icon;rounded;iconTemplate;templates;_iconTemplate;_componentStyle=m(pt);onAfterContentInit(){this.templates?.forEach(t=>{t.getType()==="icon"&&(this._iconTemplate=t.template)})}static \u0275fac=(()=>{let t;return function(a){return(t||(t=b(e)))(a||e)}})();static \u0275cmp=N({type:e,selectors:[["p-tag"]],contentQueries:function(n,a,u){if(n&1&&(me(u,At,4),me(u,je,4)),n&2){let h;G(h=Y())&&(a.iconTemplate=h.first),G(h=Y())&&(a.templates=h)}},hostVars:2,hostBindings:function(n,a){n&2&&_(a.cn(a.cx("root"),a.styleClass))},inputs:{styleClass:"styleClass",severity:"severity",value:"value",icon:"icon",rounded:[2,"rounded","rounded",O]},features:[R([pt,{provide:mt,useExisting:e},{provide:j,useExisting:e}]),B([g]),A],ngContentSelectors:Bt,decls:5,vars:6,consts:[[4,"ngIf"],[3,"class","pBind",4,"ngIf"],[3,"pBind"],[3,"class","ngClass","pBind",4,"ngIf"],[3,"ngClass","pBind"],[4,"ngTemplateOutlet"]],template:function(n,a){n&1&&(te(),ne(0),E(1,Ft,2,1,"ng-container",0)(2,Pt,2,4,"span",1),r(3,"span",2),l(4),o()),n&2&&(s(),d("ngIf",!a.iconTemplate&&!a._iconTemplate),s(),d("ngIf",a.iconTemplate||a._iconTemplate),s(),_(a.cx("label")),d("pBind",a.ptm("label")),s(),f(a.value))},dependencies:[$,re,oe,Ae,y,g],encapsulation:2,changeDetection:0})}return e})(),ut=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=z({type:e});static \u0275inj=I({imports:[be,y,y]})}return e})();var gt=`
    .p-skeleton {
        display: block;
        overflow: hidden;
        background: dt('skeleton.background');
        border-radius: dt('skeleton.border.radius');
    }

    .p-skeleton::after {
        content: '';
        animation: p-skeleton-animation 1.2s infinite;
        height: 100%;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(-100%);
        z-index: 1;
        background: linear-gradient(90deg, rgba(255, 255, 255, 0), dt('skeleton.animation.background'), rgba(255, 255, 255, 0));
    }

    [dir='rtl'] .p-skeleton::after {
        animation-name: p-skeleton-animation-rtl;
    }

    .p-skeleton-circle {
        border-radius: 50%;
    }

    .p-skeleton-animation-none::after {
        animation: none;
    }

    @keyframes p-skeleton-animation {
        from {
            transform: translateX(-100%);
        }
        to {
            transform: translateX(100%);
        }
    }

    @keyframes p-skeleton-animation-rtl {
        from {
            transform: translateX(100%);
        }
        to {
            transform: translateX(-100%);
        }
    }
`;var Ot={root:{position:"relative"}},$t={root:({instance:e})=>["p-skeleton p-component",{"p-skeleton-circle":e.shape==="circle","p-skeleton-animation-none":e.animation==="none"}]},ft=(()=>{class e extends F{name="skeleton";style=gt;classes=$t;inlineStyles=Ot;static \u0275fac=(()=>{let t;return function(a){return(t||(t=b(e)))(a||e)}})();static \u0275prov=C({token:e,factory:e.\u0275fac})}return e})();var ht=new D("SKELETON_INSTANCE"),ye=(()=>{class e extends q{$pcSkeleton=m(ht,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=m(g,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}styleClass;shape="rectangle";animation="wave";borderRadius;size;width="100%";height="1rem";_componentStyle=m(ft);get containerStyle(){let t=this._componentStyle?.inlineStyles.root,n;return this.size?n=pe(ce({},t),{width:this.size,height:this.size,borderRadius:this.borderRadius}):n=pe(ce({},t),{width:this.width,height:this.height,borderRadius:this.borderRadius}),n}static \u0275fac=(()=>{let t;return function(a){return(t||(t=b(e)))(a||e)}})();static \u0275cmp=N({type:e,selectors:[["p-skeleton"]],hostVars:5,hostBindings:function(n,a){n&2&&(M("aria-hidden",!0),Ne(a.containerStyle),_(a.cn(a.cx("root"),a.styleClass)))},inputs:{styleClass:"styleClass",shape:"shape",animation:"animation",borderRadius:"borderRadius",size:"size",width:"width",height:"height"},features:[R([ft,{provide:ht,useExisting:e},{provide:j,useExisting:e}]),B([g]),A],decls:0,vars:0,template:function(n,a){},dependencies:[$,y],encapsulation:2,changeDetection:0})}return e})(),xt=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=z({type:e});static \u0275inj=I({imports:[ye,y,y]})}return e})();var L=class L{constructor(){this.auth=m(se);this.channels=[];this.generation=0;this.contacts=x([]);this.recipient=x(null);this.messages=x([]);this.connectionStatus=x("disconnected");this.error=x("");this.sending=x(!1);this.loadingContacts=x(!1);this.loadingHistory=x(!1);this.auth.client.auth.onAuthStateChange((i,t)=>{t||this.stopConnection()})}get currentUserId(){return this.auth.user()?.id??""}async startConnection(){if(this.connectionStatus()==="connected"||this.connectionStatus()==="connecting")return;let i=++this.generation;this.connectionStatus.set("connecting"),this.error.set("");try{if(await this.removeChannels(),!await this.auth.authenticated())throw new Error("Please sign in again.");let t=this.auth.user();if(!t)throw new Error("Please sign in again.");let{data:n,error:a}=await this.auth.client.auth.getSession();if(a)throw a;if(!n.session)throw new Error("Please sign in again.");this.auth.client.realtime.setAuth(n.session.access_token);let{data:u,error:h}=await this.auth.client.from("profiles").select("id").eq("id",t.id).maybeSingle();if(h)throw h;if(!u){let V=String(t.user_metadata.display_name||"Member").trim().slice(0,60)||"Member",{error:X}=await this.auth.client.from("profiles").upsert({id:t.id,display_name:V},{onConflict:"id",ignoreDuplicates:!0});if(X)throw X}if(await this.refreshContacts(),i!==this.generation)return;let Q=this.auth.client.channel(`messages:${t.id}`).on("postgres_changes",{event:"INSERT",schema:"public",table:"messages",filter:`recipient_id=eq.${t.id}`},V=>this.receiveMessage(V.new,i,t.id)).on("postgres_changes",{event:"INSERT",schema:"public",table:"messages",filter:`sender_id=eq.${t.id}`},V=>this.receiveMessage(V.new,i,t.id));if(this.channels.push(Q),await new Promise((V,X)=>{let Ce=setTimeout(()=>X(new Error("Realtime connection timed out. Please reconnect.")),15e3);Q.subscribe((K,bt)=>{if(K==="SUBSCRIBED")clearTimeout(Ce),i===this.generation&&(this.connectionStatus.set("connected"),this.error.set("")),V();else if(K==="CHANNEL_ERROR"||K==="TIMED_OUT"||K==="CLOSED"){clearTimeout(Ce);let de=bt??new Error(`Realtime subscription ${K.toLowerCase()}.`);i===this.generation&&(this.connectionStatus.set("error"),this.error.set(de instanceof Error?de.message:"Realtime connection lost. Please reconnect.")),X(de)}})}),i!==this.generation)return;await this.loadHistory()}catch(t){i===this.generation&&(await this.removeChannels(),this.fail(t))}}async refreshContacts(){let i=this.generation;this.loadingContacts.set(!0);try{let{data:t,error:n}=await this.auth.client.from("profiles").select("id, display_name").neq("id",this.currentUserId).order("display_name");if(i!==this.generation)return;if(n)throw n;this.contacts.set(t??[])}finally{i===this.generation&&this.loadingContacts.set(!1)}}async selectRecipient(i){this.recipient.set(this.contacts().find(t=>t.id===i)??null),this.messages.set([]),this.error.set("");try{await this.loadHistory()}catch(t){this.fail(t,!1)}}receiveMessage(i,t,n){if(t!==this.generation)return;let a=this.recipient();a&&(i.sender_id===n&&i.recipient_id===a.id||i.sender_id===a.id&&i.recipient_id===n)&&this.merge([i])}async loadHistory(){let i=this.recipient(),t=this.currentUserId,n=this.generation;if(!(!i||!t)){this.loadingHistory.set(!0);try{let{data:a,error:u}=await this.auth.client.from("messages").select("*").or("and(sender_id.eq."+t+",recipient_id.eq."+i.id+"),and(sender_id.eq."+i.id+",recipient_id.eq."+t+")").order("created_at",{ascending:!1}).limit(100);if(n!==this.generation||this.recipient()?.id!==i.id)return;if(u)throw u;this.merge(a??[])}finally{n===this.generation&&this.recipient()?.id===i.id&&this.loadingHistory.set(!1)}}}merge(i){let t=new Map(this.messages().map(n=>[n.id,n]));for(let n of i)t.set(n.id,{id:n.id,username:this.contacts().find(a=>a.id===n.sender_id)?.display_name??"You",message:n.body,timestamp:new Date(n.created_at),isMe:n.sender_id===this.currentUserId});this.messages.set([...t.values()].sort((n,a)=>n.timestamp.getTime()-a.timestamp.getTime()||n.id.localeCompare(a.id)).slice(-100))}async sendMessage(i){let t=this.recipient(),n=i.trim(),a=this.currentUserId;if(!t||!n||n.length>4e3||this.sending())throw new Error("Choose a contact and enter a message of 1\u20134000 characters.");if(this.connectionStatus()!=="connected")throw new Error("Reconnect before sending a message.");let u=this.generation;this.sending.set(!0),this.error.set("");try{let{data:h,error:Q}=await this.auth.client.from("messages").insert({sender_id:a,recipient_id:t.id,body:n}).select("id, sender_id, recipient_id, body, created_at").single();if(Q)throw Q;u===this.generation&&this.recipient()?.id===t.id&&this.merge([h])}catch(h){throw this.fail(h,!1),h}finally{this.sending.set(!1)}}fail(i,t=!0){this.error.set(i instanceof Error?i.message:"Unable to load messages. Please try again."),t&&this.connectionStatus.set("error")}async removeChannels(){let i=this.channels;this.channels=[],await Promise.all(i.map(t=>this.auth.client.removeChannel(t)))}async stopConnection(){++this.generation,await this.removeChannels(),this.messages.set([]),this.contacts.set([]),this.recipient.set(null),this.loadingContacts.set(!1),this.loadingHistory.set(!1),this.connectionStatus.set("disconnected")}};L.\u0275fac=function(t){return new(t||L)},L.\u0275prov=C({token:L,factory:L.\u0275fac,providedIn:"root"});var le=L;var Ut=["messageContainer"],Qt=()=>[1,2,3],_t=(e,i)=>i.id;function Xt(e,i){e&1&&(r(0,"div",28),c(1,"p-skeleton",29)(2,"p-skeleton",30),o())}function Kt(e,i){e&1&&Z(0,Xt,3,0,"div",28,ke),e&2&&ee(ze(0,Qt))}function Gt(e,i){if(e&1){let t=H();r(0,"button",33),v("click",function(){let a=S(t).$implicit,u=p(2);return w(u.selectContact(a.id))}),c(1,"p-avatar",34),r(2,"span",35)(3,"strong"),l(4),o(),r(5,"small"),l(6),o()(),c(7,"i",36),o()}if(e&2){let t,n=i.$implicit,a=p(2);d("disabled",a.chatService.sending()),M("aria-pressed",((t=a.chatService.recipient())==null?null:t.id)===n.id),s(),d("label",a.initials(n.display_name)),s(3),f(n.display_name),s(2),ie("Member \xB7 ",n.id.slice(0,8))}}function Yt(e,i){if(e&1&&(r(0,"div",32),c(1,"i",37),r(2,"strong"),l(3),o(),r(4,"p"),l(5),o()()),e&2){let t=p(2);s(3),f(t.search()?"No matches yet":"Make your first connection"),s(2),f(t.search()?"Try a different name or member ID.":"Invite a friend to sign up and open chat, then refresh your people list.")}}function Wt(e,i){if(e&1&&Z(0,Gt,8,5,"button",31,_t,!1,Yt,6,2,"div",32),e&2){let t=p();ee(t.filteredContacts())}}function Jt(e,i){if(e&1){let t=H();r(0,"p-button",40),v("onClick",function(){S(t);let a=p(2);return w(a.chatService.startConnection())}),o()}e&2&&d("outlined",!0)}function Zt(e,i){if(e&1&&(r(0,"div",26)(1,"p-message",38),l(2),o(),k(3,Jt,1,1,"p-button",39),o()),e&2){let t=p();s(),d("closable",!1),s(),f(t.chatService.error()),s(),T(t.chatService.connectionStatus()==="error"||t.chatService.connectionStatus()==="disconnected"?3:-1)}}function en(e,i){e&1&&(r(0,"div",46),c(1,"p-skeleton",54)(2,"p-skeleton",55),o())}function tn(e,i){if(e&1&&(r(0,"div",47)(1,"span",56),c(2,"i",57),o(),r(3,"h3"),l(4),o(),r(5,"p"),l(6,"A simple hello can be the start of something good."),o()()),e&2){let t=p();s(4),ie("Say hello to ",t.display_name)}}function nn(e,i){if(e&1&&(r(0,"div",58)(1,"span"),l(2),ge(3,"date"),o()()),e&2){let t=p().$implicit;s(2),f(fe(3,1,t.timestamp,"mediumDate"))}}function an(e,i){if(e&1&&c(0,"p-avatar",60),e&2){let t=p().$implicit,n=p(2);d("label",n.initials(t.username))}}function rn(e,i){e&1&&c(0,"i",64)}function on(e,i){if(e&1&&(k(0,nn,4,4,"div",58),r(1,"div",59),k(2,an,1,1,"p-avatar",60),r(3,"div",61)(4,"div",62),l(5),o(),r(6,"div",63)(7,"span"),l(8),ge(9,"date"),o(),k(10,rn,1,0,"i",64),o()()()),e&2){let t=i.$implicit,n=i.$index,a=p(2);T(a.startsDay(n,t)?0:-1),s(),M("data-mine",t.isMe),s(),T(t.isMe?-1:2),s(3),f(t.message),s(3),f(fe(9,6,t.timestamp,"shortTime")),s(2),T(t.isMe?10:-1)}}function sn(e,i){if(e&1){let t=H();r(0,"header",41)(1,"p-button",42),v("onClick",function(){S(t);let a=p();return w(a.selectContact(""))}),o(),c(2,"p-avatar",34),r(3,"div")(4,"h2"),l(5),o(),r(6,"p"),c(7,"i",43),l(8," Private conversation"),o()(),r(9,"span",44),l(10,"A good conversation starts here"),o()(),r(11,"div",45,0),k(13,en,3,0,"div",46)(14,tn,7,1,"div",47),Z(15,on,11,9,null,null,_t),o(),r(17,"form",48),v("ngSubmit",function(){S(t);let a=p();return w(a.send())}),r(18,"div",49)(19,"textarea",50),v("ngModelChange",function(a){S(t);let u=p();return w(u.inputMessage.set(a))})("keydown",function(a){S(t);let u=p();return w(u.onKeyDown(a))}),o(),c(20,"p-button",51),o(),r(21,"div",52)(22,"span"),l(23,"Enter to send "),r(24,"span",53),l(25,"\xB7"),o(),l(26," Shift + Enter for a new line"),o(),r(27,"span"),l(28),o()()()}if(e&2){let t=i,n=p();s(),d("text",!0),s(),d("label",n.initials(t.display_name)),s(3),f(t.display_name),s(8),T(n.chatService.loadingHistory()?13:n.chatService.messages().length===0?14:-1),s(2),ee(n.chatService.messages()),s(4),d("ngModel",n.inputMessage())("autoResize",!0)("disabled",n.chatService.sending()),s(),d("rounded",!0)("loading",n.chatService.sending())("disabled",!n.inputMessage().trim()||n.chatService.sending()||n.chatService.connectionStatus()!=="connected"),s(8),ie("",n.inputMessage().length," / 4000")}}function ln(e,i){e&1&&(r(0,"div",27)(1,"div",65),c(2,"span",66),r(3,"div",67),c(4,"i",68),o(),r(5,"div",69),c(6,"i",70),o(),r(7,"span",71),l(8,"\u2726"),o(),r(9,"span",72),l(10,"\u2726"),o()(),r(11,"span",73),l(12,"GOOD CONVERSATIONS LIVE HERE"),o(),r(13,"h2"),l(14,"A small hello."),c(15,"br"),l(16,"A real connection."),o(),r(17,"p"),l(18,"Choose someone from your people list"),c(19,"br"),l(20,"and pick up the conversation."),o(),r(21,"span",74),c(22,"i",43),l(23," Your messages are shared only with the person you choose."),o()())}var U=class U{constructor(){this.chatService=m(le);this.auth=m(se);this.router=m(Re);this.injector=m(Se);this.inputMessage=x("");this.search=x("");this.loggingOut=x(!1);this.filteredContacts=P(()=>{let i=this.search().trim().toLocaleLowerCase();return this.chatService.contacts().filter(t=>t.display_name.toLocaleLowerCase().includes(i)||t.id.includes(i))});this.displayName=P(()=>String(this.auth.user()?.user_metadata.display_name||"Member"));this.statusLabel=P(()=>{let i=this.chatService.connectionStatus();return i==="connected"?"Live":i==="connecting"?"Connecting":"Offline"});this.statusSeverity=P(()=>this.chatService.connectionStatus()==="connected"?"success":"warn");xe(()=>{this.auth.user()||this.router.navigateByUrl("/login")}),xe(()=>{this.chatService.messages(),Ee(()=>{let i=this.messageContainer?.nativeElement;i&&(i.scrollTop=i.scrollHeight)},{injector:this.injector})})}async ngOnInit(){await this.chatService.startConnection()}async refreshContacts(){try{await this.chatService.refreshContacts()}catch(i){this.chatService.error.set(i instanceof Error?i.message:"Unable to refresh contacts.")}}async logout(){this.loggingOut.set(!0);try{await this.auth.signOut(),await this.chatService.stopConnection(),await this.router.navigateByUrl("/login")}catch(i){this.chatService.error.set(i instanceof Error?i.message:"Sign out failed.")}finally{this.loggingOut.set(!1)}}async selectContact(i){this.chatService.sending()||(this.inputMessage.set(""),await this.chatService.selectRecipient(i))}async send(){let i=this.inputMessage();if(!(!i.trim()||this.chatService.sending()))try{await this.chatService.sendMessage(i),this.inputMessage()===i&&this.inputMessage.set("")}catch{}}onKeyDown(i){i.key==="Enter"&&!i.shiftKey&&!i.isComposing&&(i.preventDefault(),this.send())}initials(i){return i.trim().split(/\s+/).slice(0,2).map(t=>Array.from(t)[0]??"").join("").toLocaleUpperCase()}startsDay(i,t){let n=this.chatService.messages()[i-1];return!n||n.timestamp.toDateString()!==t.timestamp.toDateString()}async ngOnDestroy(){await this.chatService.stopConnection()}};U.\u0275fac=function(t){return new(t||U)},U.\u0275cmp=N({type:U,selectors:[["app-chat"]],viewQuery:function(t,n){if(t&1&&De(Ut,5),t&2){let a;G(a=Y())&&(n.messageContainer=a.first)}},hostAttrs:[1,"block"],decls:43,vars:17,consts:[["messageContainer",""],[1,"flex","h-dvh","min-h-0","flex-col","overflow-hidden","bg-[#f6f7f4]","text-[#25362f]"],[1,"flex","h-21","shrink-0","items-center","justify-between","gap-5","border-b","border-[#e4e9e2]","bg-white","px-[5%]","max-[800px]:h-17.5","max-[800px]:px-5.5"],["routerLink","/chat","aria-label","Convo home",1,"inline-flex","items-center","gap-2.5","text-[29px]","font-extrabold","tracking-[-1.7px]","text-[#25362f]","no-underline"],[1,"grid","size-9.25","place-items-center","rounded-xl","bg-[#147d65]","text-white","[&_i]:text-xl"],["aria-hidden","true",1,"pi","pi-comments"],[1,"text-[#16816a]"],[1,"text-[13px]","text-[#88938c]","max-[800px]:hidden"],[1,"flex","items-center","gap-3","text-[13px]","font-semibold"],["styleClass","size-8.25 shrink-0 bg-[#e7f0e6] text-[10px] font-semibold text-[#537b60]","shape","circle",3,"label"],[1,"max-[600px]:hidden"],[3,"value","severity","rounded","icon"],["icon","pi pi-sign-out","severity","secondary","ariaLabel","Sign out",3,"onClick","text","loading"],[1,"mx-auto","flex","min-h-0","w-full","max-w-[1280px]","flex-1","flex-col","px-4","py-4","max-[600px]:p-2"],["aria-label","Messenger",1,"group/shell","grid","min-h-0","flex-1","grid-cols-[300px_minmax(0,1fr)]","overflow-hidden","rounded-[20px]","border","border-[#e0e7df]","bg-white","shadow-[0_10px_35px_#24362c06]","max-[800px]:grid-cols-[250px_minmax(0,1fr)]","max-[600px]:grid-cols-1","max-[600px]:rounded-[15px]"],[1,"flex","min-h-0","flex-col","border-r","border-[#e8ece6]","max-[600px]:border-0","max-[600px]:group-data-[conversation-open=true]/shell:hidden"],[1,"flex","items-center","gap-2.25","px-5.5","pt-4.5","pb-3","[&_h2]:text-base","[&_h2]:font-[650]","[&_p-button]:ml-auto"],[1,"grid","h-5.5","min-w-[23px]","place-items-center","rounded-md","bg-[#f1f4ee]","text-[11px]","text-[#7c8c81]"],["icon","pi pi-refresh","severity","secondary","ariaLabel","Refresh contacts",3,"onClick","text","rounded","loading"],[1,"relative","mx-4.5","mb-4","[&_i]:absolute","[&_i]:top-3.5","[&_i]:left-3.25","[&_i]:z-1","[&_i]:text-xs","[&_i]:text-[#98a49a]","[&_input]:w-full","[&_input]:rounded-[10px]","[&_input]:border-[#edf0e9]","[&_input]:bg-[#f7f9f5]","[&_input]:py-3","[&_input]:pr-3","[&_input]:pl-8.75","[&_input]:text-xs"],["aria-hidden","true",1,"pi","pi-search"],["pInputText","","aria-label","Search contacts","placeholder","Find someone\u2026",3,"ngModelChange","ngModel"],[1,"flex-1","overflow-y-auto","px-3"],[1,"mx-5.5","mt-4","mb-5.75","flex","items-center","gap-2.5","border-t","border-[#edf0ea]","pt-5","text-[10px]","leading-[1.8]","text-[#8c9a91]","[&_i]:text-[19px]","[&_i]:text-[#6f9682]","[&_strong]:font-medium","[&_strong]:text-[#5e7969]"],["aria-hidden","true",1,"pi","pi-shield"],[1,"flex","min-h-0","min-w-0","flex-col","bg-[#fcfdfb]","max-[600px]:hidden","max-[600px]:group-data-[conversation-open=true]/shell:flex"],["role","alert",1,"flex","items-center","gap-2.5","px-4.5","py-3","[&_p-message]:min-w-0","[&_p-message]:flex-1","[&_p-message]:wrap-anywhere"],[1,"flex","flex-1","flex-col","items-center","justify-center","px-5.5","py-8.75","text-center","[&_h2]:my-[15px]","[&_h2]:font-serif","[&_h2]:text-[37px]","[&_h2]:leading-[1.17]","[&_h2]:font-normal","[&_h2]:tracking-[-1px]","[&_h2]:text-[#334d3d]","max-[800px]:[&_h2]:text-[30px]","[&_p]:text-xs","[&_p]:leading-[1.9]","[&_p]:text-[#8c9d8d]"],[1,"flex","items-center","gap-3","px-3","py-3.75"],["shape","circle","size","2.75rem"],["width","9rem","height","1rem"],["type","button",1,"mb-1","flex","w-full","cursor-pointer","items-center","gap-3","rounded-[11px]","border-0","bg-transparent","px-3","py-3.75","text-left","text-inherit","transition-colors","duration-150","hover:bg-[#f7f9f5]","aria-pressed:bg-[#eaf5ef]","disabled:cursor-wait","motion-reduce:transition-none","[&>i]:text-[11px]","[&>i]:text-[#829b8b]",3,"disabled"],[1,"px-4","py-9","text-center","text-[#819188]","[&>i]:mb-3.75","[&>i]:block","[&>i]:text-[27px]","[&_strong]:text-[13px]","[&_strong]:text-[#526b5d]","[&_p]:mt-2","[&_p]:text-xs","[&_p]:leading-[1.8]"],["type","button",1,"mb-1","flex","w-full","cursor-pointer","items-center","gap-3","rounded-[11px]","border-0","bg-transparent","px-3","py-3.75","text-left","text-inherit","transition-colors","duration-150","hover:bg-[#f7f9f5]","aria-pressed:bg-[#eaf5ef]","disabled:cursor-wait","motion-reduce:transition-none","[&>i]:text-[11px]","[&>i]:text-[#829b8b]",3,"click","disabled"],["styleClass","size-10.5 shrink-0 bg-[#e7f0e6] text-xs font-semibold text-[#537b60]","shape","circle",3,"label"],[1,"flex","min-w-0","flex-1","flex-col","gap-1.25","[&_strong]:truncate","[&_strong]:text-[13px]","[&_small]:text-[10px]","[&_small]:text-[#8b998f]"],["aria-hidden","true",1,"pi","pi-angle-right"],["aria-hidden","true",1,"pi","pi-users"],["severity","error",3,"closable"],["label","Reconnect","icon","pi pi-refresh","size","small",3,"outlined"],["label","Reconnect","icon","pi pi-refresh","size","small",3,"onClick","outlined"],[1,"flex","shrink-0","items-center","gap-3","border-b","border-[#e8ede6]","bg-white","px-7","py-5","max-[800px]:px-4.5","max-[600px]:gap-2","max-[600px]:px-3.5","max-[600px]:py-3","[&_h2]:mb-1.25","[&_h2]:text-[15px]","[&_h2]:font-[650]","[&_p]:text-[10px]","[&_p]:text-[#869b8d]","[&_p_i]:mr-1","[&_p_i]:text-[9px]"],["icon","pi pi-arrow-left","severity","secondary","ariaLabel","Back to people",1,"hidden","max-[600px]:block",3,"onClick","text"],["aria-hidden","true",1,"pi","pi-lock"],[1,"ml-auto","text-[10px]","text-[#a0aaa1]","max-[800px]:hidden"],["role","log","aria-label","Conversation messages","aria-live","polite",1,"min-h-0","flex-1","overflow-y-auto","px-7","py-4.5","max-[800px]:px-4.5"],[1,"grid","gap-4.5"],[1,"flex","h-full","min-h-40","flex-col","items-center","justify-center","text-center","[&_h3]:mb-2.25","[&_h3]:text-lg","[&_p]:text-xs","[&_p]:text-[#8c9a90]"],[1,"shrink-0","border-t","border-[#e8ede6]","bg-white","px-7","pt-4","pb-4.75","max-[800px]:px-4.5",3,"ngSubmit"],[1,"flex","items-end","gap-3","rounded-[14px]","border","border-[#dce5db]","bg-[#fbfcf9]","py-2","pr-2.5","pl-4","focus-within:border-[#73a992]","focus-within:shadow-[0_0_0_3px_#1881690a]","[&_textarea]:max-h-35","[&_textarea]:min-w-0","[&_textarea]:flex-1","[&_textarea]:resize-none","[&_textarea]:border-0","[&_textarea]:bg-transparent","[&_textarea]:px-0","[&_textarea]:py-2","[&_textarea]:text-[13px]","[&_textarea]:leading-[1.6]","[&_textarea]:shadow-none"],["pTextarea","","aria-label","Write a message","placeholder","Write something nice\u2026","name","message","rows","1","maxlength","4000",3,"ngModelChange","keydown","ngModel","autoResize","disabled"],["styleClass","size-9","type","submit","icon","pi pi-arrow-up","ariaLabel","Send message",3,"rounded","loading","disabled"],[1,"mx-0.5","mt-2.5","flex","justify-between","gap-2.5","text-[9px]","text-[#9daa9e]","max-[600px]:text-[8px]"],[1,"mx-1.25"],["width","60%","height","3rem"],["width","45%","height","3rem"],[1,"mb-3.5","grid","size-14.5","place-items-center","rounded-[19px]","bg-[#edf5ee]","text-[25px]","text-[#4a9875]"],["aria-hidden","true",1,"pi","pi-comment"],[1,"mt-2.5","mb-6","flex","justify-center","[&_span]:rounded-[20px]","[&_span]:bg-[#f0f3ed]","[&_span]:px-3","[&_span]:py-1.25","[&_span]:text-[10px]","[&_span]:text-[#91a08f]"],[1,"group/message","mb-4.5","flex","items-end","gap-2.25","data-[mine=true]:justify-end"],["styleClass","size-6.75 shrink-0 bg-[#e7f0e6] text-[9px] font-semibold text-[#537b60]","shape","circle",3,"label"],[1,"min-w-0","max-w-[78%]","max-[600px]:max-w-[85%]"],[1,"rounded-[14px_14px_14px_4px]","border","border-[#e5eae1]","bg-white","px-4","py-3","text-[13px]","leading-[1.7]","whitespace-pre-wrap","text-[#3b5042]","wrap-anywhere","group-data-[mine=true]/message:rounded-[14px_14px_4px_14px]","group-data-[mine=true]/message:border-[#187e67]","group-data-[mine=true]/message:bg-[#187e67]","group-data-[mine=true]/message:text-white"],[1,"mx-0.75","mt-1.5","flex","items-center","gap-1.5","text-[9px]","text-[#a0ada3]","group-data-[mine=true]/message:justify-end","[&_i]:text-[10px]","[&_i]:text-[#3c9a7f]"],["aria-label","Saved",1,"pi","pi-check"],["aria-hidden","true",1,"relative","mb-7","h-36.25","w-50"],[1,"absolute","top-1.25","left-7.5","size-35","rounded-full","bg-[#f0f4e9]"],[1,"absolute","top-6.25","left-5","grid","h-17.5","w-24","-rotate-9","place-items-center","rounded-[22px_22px_22px_5px]","bg-[#187e67]","text-[33px]","text-white","shadow-[0_8px_20px_#2b725b12]"],[1,"pi","pi-ellipsis-h"],[1,"absolute","top-19.25","right-3.75","grid","h-15.25","w-19","rotate-9","place-items-center","rounded-[19px_19px_5px_19px]","bg-[#e7c78d]","text-2xl","text-white","shadow-[0_8px_20px_#2b725b12]"],[1,"pi","pi-heart"],[1,"absolute","top-5.5","right-4","text-lg","text-[#a1b59a]"],[1,"absolute","bottom-1.25","left-3.5","text-[13px]","text-[#a1b59a]"],[1,"text-[10px]","font-bold","tracking-[2.2px]","text-[#7b8e82]","max-[600px]:text-[9px]"],[1,"mt-10.5","text-[9px]","text-[#99a697]","[&_i]:mr-[5px]"]],template:function(t,n){if(t&1&&(r(0,"div",1)(1,"header",2)(2,"a",3)(3,"span",4),c(4,"i",5),o(),r(5,"span"),l(6,"Pi"),r(7,"span",6),l(8,"."),o()()(),r(9,"span",7),l(10,"A little closer, one message at a time."),o(),r(11,"div",8),c(12,"p-avatar",9),r(13,"span",10),l(14),o(),c(15,"p-tag",11),r(16,"p-button",12),v("onClick",function(){return n.logout()}),o()()(),r(17,"main",13)(18,"section",14)(19,"aside",15)(20,"div",16)(21,"h2"),l(22,"People"),o(),r(23,"span",17),l(24),o(),r(25,"p-button",18),v("onClick",function(){return n.refreshContacts()}),o()(),r(26,"div",19),c(27,"i",20),r(28,"input",21),v("ngModelChange",function(u){return n.search.set(u)}),o()(),r(29,"div",22),k(30,Kt,2,1)(31,Wt,3,1),o(),r(32,"div",23),c(33,"i",24),r(34,"span"),l(35,"Private conversations."),c(36,"br"),r(37,"strong"),l(38,"Just between you two."),o()()()(),r(39,"div",25),k(40,Zt,4,3,"div",26),k(41,sn,29,11)(42,ln,24,0,"div",27),o()()()()),t&2){let a;s(12),d("label",n.initials(n.displayName())),s(2),f(n.displayName()),s(),d("value",n.statusLabel())("severity",n.statusSeverity())("rounded",!0)("icon",n.chatService.connectionStatus()==="connected"?"pi pi-bolt":"pi pi-wifi"),s(),d("text",!0)("loading",n.loggingOut()),s(2),M("data-conversation-open",!!n.chatService.recipient()),s(6),f(n.chatService.contacts().length),s(),d("text",!0)("rounded",!0)("loading",n.chatService.loadingContacts()),s(3),d("ngModel",n.search()),s(2),T(n.chatService.loadingContacts()?30:31),s(10),T(n.chatService.error()?40:-1),s(),T((a=n.chatService.recipient())?41:42,a)}},dependencies:[at,_e,Ge,Ke,Je,We,dt,lt,ut,be,et,Ze,xt,ye,Qe,qe,Ve,Le,He,Ue,$e,Oe,Fe,Be],encapsulation:2});var vt=U;export{vt as Chat};
