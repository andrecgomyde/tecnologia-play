/*!
 * Retina.js
 *
 * Copyright 2013 Imulus, LLC
 * Released under the MIT license
 *
 * Retina.js is an open source script that makes it easy to serve
 * high-resolution images to devices with retina displays.
 */

 // adds .naturalWidth() and .naturalHeight() methods to jQuery
 // for retreaving a normalized naturalWidth and naturalHeight.
(function($){

 var
 props = ['Width', 'Height'],
 prop;

 while (prop = props.pop()) {
 (function (natural, prop) {
   $.fn[natural] = (natural in new Image()) ? 
   function () {
   return this[0][natural];
   } : 
   function () {
   var 
   node = this[0],
   img,
   value;

   if (node.tagName.toLowerCase() === 'img') {
     img = new Image();
     img.src = node.src,
     value = img[prop];
   }
   return value;
   };
 }('natural' + prop, prop.toLowerCase()));
 }
}(jQuery));


/* Retina */
        /*that.el.setAttribute('width', that.el.offsetWidth);
        that.el.setAttribute('height', that.el.offsetHeight);*/
        /*that.el.setAttribute('src', path);
        that.el.setAttribute('width', jQuery(that.el).naturalWidth());
       that.el.setAttribute('height', jQuery(that.el).naturalHeight());*/

       (function() {
           var root = (typeof exports === 'undefined' ? window : exports);
           var config = {
               // An option to choose a suffix for 2x images
               retinaImageSuffix : '@2x',

               // Ensure Content-Type is an image before trying to load @2x image
               // https://github.com/imulus/retinajs/pull/45)
               check_mime_type: true,

               // Resize high-resolution images to original image's pixel dimensions
               // https://github.com/imulus/retinajs/issues/8
               force_original_dimensions: true
           };

           function Retina() {}

           root.Retina = Retina;

           Retina.configure = function(options) {
               if (options === null) {
                   options = {};
               }

               for (var prop in options) {
                   if (options.hasOwnProperty(prop)) {
                       config[prop] = options[prop];
                   }
               }
           };

           Retina.init = function(context) {
               if (context === null) {
                   context = root;
               }

               var existing_onload = context.onload || function(){};

               context.onload = function() {
                   var images = document.getElementsByTagName('img'), retinaImages = [], i, image;
                   for (i = 0; i < images.length; i += 1) {
                       image = images[i];
                       if (!!!image.getAttributeNode('data-no-retina')) {
                           retinaImages.push(new RetinaImage(image));
                       }
                   }
                   existing_onload();
               };
           };

           Retina.isRetina = function(){
               var mediaQuery = '(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)';

               if (root.devicePixelRatio > 1) {
                   return true;
               }

               if (root.matchMedia && root.matchMedia(mediaQuery).matches) {
                   return true;
               }

               return false;
           };


           var regexMatch = /\.\w+$/;
           function suffixReplace (match) {
               return config.retinaImageSuffix + match;
           }

           function RetinaImagePath(path, at_2x_path) {
               this.path = path || '';
               if (typeof at_2x_path !== 'undefined' && at_2x_path !== null) {
                   this.at_2x_path = at_2x_path;
                   this.perform_check = false;
               } else {
                   if (undefined !== document.createElement) {
                       var locationObject = document.createElement('a');
                       locationObject.href = this.path;
                       locationObject.pathname = locationObject.pathname.replace(regexMatch, suffixReplace);
                       this.at_2x_path = locationObject.href;
                   } else {
                       var parts = this.path.split('?');
                       parts[0] = parts[0].replace(regexMatch, suffixReplace);
                       this.at_2x_path = parts.join('?');
                   }
                   this.perform_check = true;
               }
           }

           root.RetinaImagePath = RetinaImagePath;

           RetinaImagePath.confirmed_paths = [];

           RetinaImagePath.prototype.is_external = function() {
               return !!(this.path.match(/^https?\:/i) && !this.path.match('//' + document.domain) );
           };

           RetinaImagePath.prototype.check_2x_variant = function(callback) {
               var http, that = this;
               if (this.is_external()) {
                   return callback(false);
               } else if (!this.perform_check && typeof this.at_2x_path !== 'undefined' && this.at_2x_path !== null) {
                   return callback(true);
               } else if (this.at_2x_path in RetinaImagePath.confirmed_paths) {
                   return callback(true);
               } else {
                   http = new XMLHttpRequest();
                   http.open('HEAD', this.at_2x_path);
                   http.onreadystatechange = function() {
                       if (http.readyState !== 4) {
                           return callback(false);
                       }

                       if (http.status >= 200 && http.status <= 399) {
                           if (config.check_mime_type) {
                               var type = http.getResponseHeader('Content-Type');
                               if (type === null || !type.match(/^image/i)) {
                                   return callback(false);
                               }
                           }

                           RetinaImagePath.confirmed_paths.push(that.at_2x_path);
                           return callback(true);
                       } else {
                           return callback(false);
                       }
                   };
                   http.send();
               }
           };


           function RetinaImage(el) {
               this.el = el;
               this.path = new RetinaImagePath(this.el.getAttribute('src'), this.el.getAttribute('data-at2x'));
               var that = this;
               this.path.check_2x_variant(function(hasVariant) {
                   if (hasVariant) {
                       that.swap();
                   }
               });
           }

           root.RetinaImage = RetinaImage;

           RetinaImage.prototype.swap = function(path) {
               if (typeof path === 'undefined') {
                   path = this.path.at_2x_path;
               }

               var that = this;
               function load() {
                   if (! that.el.complete) {
                       setTimeout(load, 5);
                   } else {
                       if (config.force_original_dimensions) {
                           that.el.setAttribute('width', that.el.offsetWidth);
                           that.el.setAttribute('height', that.el.offsetHeight);
                       }

                       that.el.setAttribute('src', path);
                   }
               }
               load();
           };


           if (Retina.isRetina()) {
               Retina.init(root);
           }
       })();


/* Carousel */
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('7(A 3c.3q!=="9"){3c.3q=9(e){9 t(){}t.5S=e;p 5R t}}(9(e,t,n){h r={1N:9(t,n){h r=c;r.$k=e(n);r.6=e.4M({},e.37.2B.6,r.$k.v(),t);r.2A=t;r.4L()},4L:9(){9 r(e){h n,r="";7(A t.6.33==="9"){t.6.33.R(c,[e])}l{1A(n 38 e.d){7(e.d.5M(n)){r+=e.d[n].1K}}t.$k.2y(r)}t.3t()}h t=c,n;7(A t.6.2H==="9"){t.6.2H.R(c,[t.$k])}7(A t.6.2O==="2Y"){n=t.6.2O;e.5K(n,r)}l{t.3t()}},3t:9(){h e=c;e.$k.v("d-4I",e.$k.2x("2w")).v("d-4F",e.$k.2x("H"));e.$k.z({2u:0});e.2t=e.6.q;e.4E();e.5v=0;e.1X=14;e.23()},23:9(){h e=c;7(e.$k.25().N===0){p b}e.1M();e.4C();e.$S=e.$k.25();e.E=e.$S.N;e.4B();e.$G=e.$k.17(".d-1K");e.$K=e.$k.17(".d-1p");e.3u="U";e.13=0;e.26=[0];e.m=0;e.4A();e.4z()},4z:9(){h e=c;e.2V();e.2W();e.4t();e.30();e.4r();e.4q();e.2p();e.4o();7(e.6.2o!==b){e.4n(e.6.2o)}7(e.6.O===j){e.6.O=4Q}e.19();e.$k.17(".d-1p").z("4i","4h");7(!e.$k.2m(":3n")){e.3o()}l{e.$k.z("2u",1)}e.5O=b;e.2l();7(A e.6.3s==="9"){e.6.3s.R(c,[e.$k])}},2l:9(){h e=c;7(e.6.1Z===j){e.1Z()}7(e.6.1B===j){e.1B()}e.4g();7(A e.6.3w==="9"){e.6.3w.R(c,[e.$k])}},3x:9(){h e=c;7(A e.6.3B==="9"){e.6.3B.R(c,[e.$k])}e.3o();e.2V();e.2W();e.4f();e.30();e.2l();7(A e.6.3D==="9"){e.6.3D.R(c,[e.$k])}},3F:9(){h e=c;t.1c(9(){e.3x()},0)},3o:9(){h e=c;7(e.$k.2m(":3n")===b){e.$k.z({2u:0});t.18(e.1C);t.18(e.1X)}l{p b}e.1X=t.4d(9(){7(e.$k.2m(":3n")){e.3F();e.$k.4b({2u:1},2M);t.18(e.1X)}},5x)},4B:9(){h e=c;e.$S.5n(\'<L H="d-1p">\').4a(\'<L H="d-1K"></L>\');e.$k.17(".d-1p").4a(\'<L H="d-1p-49">\');e.1H=e.$k.17(".d-1p-49");e.$k.z("4i","4h")},1M:9(){h e=c,t=e.$k.1I(e.6.1M),n=e.$k.1I(e.6.2i);7(!t){e.$k.I(e.6.1M)}7(!n){e.$k.I(e.6.2i)}},2V:9(){h t=c,n,r;7(t.6.2Z===b){p b}7(t.6.48===j){t.6.q=t.2t=1;t.6.1h=b;t.6.1s=b;t.6.1O=b;t.6.22=b;t.6.1Q=b;t.6.1R=b;p b}n=e(t.6.47).1f();7(n>(t.6.1s[0]||t.2t)){t.6.q=t.2t}7(t.6.1h!==b){t.6.1h.5g(9(e,t){p e[0]-t[0]});1A(r=0;r<t.6.1h.N;r+=1){7(t.6.1h[r][0]<=n){t.6.q=t.6.1h[r][1]}}}l{7(n<=t.6.1s[0]&&t.6.1s!==b){t.6.q=t.6.1s[1]}7(n<=t.6.1O[0]&&t.6.1O!==b){t.6.q=t.6.1O[1]}7(n<=t.6.22[0]&&t.6.22!==b){t.6.q=t.6.22[1]}7(n<=t.6.1Q[0]&&t.6.1Q!==b){t.6.q=t.6.1Q[1]}7(n<=t.6.1R[0]&&t.6.1R!==b){t.6.q=t.6.1R[1]}}7(t.6.q>t.E&&t.6.46===j){t.6.q=t.E}},4r:9(){h n=c,r,i;7(n.6.2Z!==j){p b}i=e(t).1f();n.3d=9(){7(e(t).1f()!==i){7(n.6.O!==b){t.18(n.1C)}t.5d(r);r=t.1c(9(){i=e(t).1f();n.3x()},n.6.45)}};e(t).44(n.3d)},4f:9(){h e=c;e.2g(e.m);7(e.6.O!==b){e.3j()}},43:9(){h t=c,n=0,r=t.E-t.6.q;t.$G.2f(9(i){h s=e(c);s.z({1f:t.M}).v("d-1K",3p(i));7(i%t.6.q===0||i===r){7(!(i>r)){n+=1}}s.v("d-24",n)})},42:9(){h e=c,t=e.$G.N*e.M;e.$K.z({1f:t*2,T:0});e.43()},2W:9(){h e=c;e.40();e.42();e.3Z();e.3v()},40:9(){h e=c;e.M=1F.4O(e.$k.1f()/e.6.q)},3v:9(){h e=c,t=(e.E*e.M-e.6.q*e.M)*-1;7(e.6.q>e.E){e.D=0;t=0;e.3z=0}l{e.D=e.E-e.6.q;e.3z=t}p t},3Y:9(){p 0},3Z:9(){h t=c,n=0,r=0,i,s,o;t.J=[0];t.3E=[];1A(i=0;i<t.E;i+=1){r+=t.M;t.J.2D(-r);7(t.6.12===j){s=e(t.$G[i]);o=s.v("d-24");7(o!==n){t.3E[n]=t.J[i];n=o}}}},4t:9(){h t=c;7(t.6.2a===j||t.6.1v===j){t.B=e(\'<L H="d-5A"/>\').5m("5l",!t.F.15).5c(t.$k)}7(t.6.1v===j){t.3T()}7(t.6.2a===j){t.3S()}},3S:9(){h t=c,n=e(\'<L H="d-4U"/>\');t.B.1o(n);t.1u=e("<L/>",{"H":"d-1n",2y:t.6.2U[0]||""});t.1q=e("<L/>",{"H":"d-U",2y:t.6.2U[1]||""});n.1o(t.1u).1o(t.1q);n.w("2X.B 21.B",\'L[H^="d"]\',9(e){e.1l()});n.w("2n.B 28.B",\'L[H^="d"]\',9(n){n.1l();7(e(c).1I("d-U")){t.U()}l{t.1n()}})},3T:9(){h t=c;t.1k=e(\'<L H="d-1v"/>\');t.B.1o(t.1k);t.1k.w("2n.B 28.B",".d-1j",9(n){n.1l();7(3p(e(c).v("d-1j"))!==t.m){t.1g(3p(e(c).v("d-1j")),j)}})},3P:9(){h t=c,n,r,i,s,o,u;7(t.6.1v===b){p b}t.1k.2y("");n=0;r=t.E-t.E%t.6.q;1A(s=0;s<t.E;s+=1){7(s%t.6.q===0){n+=1;7(r===s){i=t.E-t.6.q}o=e("<L/>",{"H":"d-1j"});u=e("<3N></3N>",{4R:t.6.39===j?n:"","H":t.6.39===j?"d-59":""});o.1o(u);o.v("d-1j",r===s?i:s);o.v("d-24",n);t.1k.1o(o)}}t.35()},35:9(){h t=c;7(t.6.1v===b){p b}t.1k.17(".d-1j").2f(9(){7(e(c).v("d-24")===e(t.$G[t.m]).v("d-24")){t.1k.17(".d-1j").Z("2d");e(c).I("2d")}})},3e:9(){h e=c;7(e.6.2a===b){p b}7(e.6.2e===b){7(e.m===0&&e.D===0){e.1u.I("1b");e.1q.I("1b")}l 7(e.m===0&&e.D!==0){e.1u.I("1b");e.1q.Z("1b")}l 7(e.m===e.D){e.1u.Z("1b");e.1q.I("1b")}l 7(e.m!==0&&e.m!==e.D){e.1u.Z("1b");e.1q.Z("1b")}}},30:9(){h e=c;e.3P();e.3e();7(e.B){7(e.6.q>=e.E){e.B.3K()}l{e.B.3J()}}},55:9(){h e=c;7(e.B){e.B.3k()}},U:9(e){h t=c;7(t.1E){p b}t.m+=t.6.12===j?t.6.q:1;7(t.m>t.D+(t.6.12===j?t.6.q-1:0)){7(t.6.2e===j){t.m=0;e="2k"}l{t.m=t.D;p b}}t.1g(t.m,e)},1n:9(e){h t=c;7(t.1E){p b}7(t.6.12===j&&t.m>0&&t.m<t.6.q){t.m=0}l{t.m-=t.6.12===j?t.6.q:1}7(t.m<0){7(t.6.2e===j){t.m=t.D;e="2k"}l{t.m=0;p b}}t.1g(t.m,e)},1g:9(e,n,r){h i=c,s;7(i.1E){p b}7(A i.6.1Y==="9"){i.6.1Y.R(c,[i.$k])}7(e>=i.D){e=i.D}l 7(e<=0){e=0}i.m=i.d.m=e;7(i.6.2o!==b&&r!=="4e"&&i.6.q===1&&i.F.1x===j){i.1t(0);7(i.F.1x===j){i.1L(i.J[e])}l{i.1r(i.J[e],1)}i.2r();i.4l();p b}s=i.J[e];7(i.F.1x===j){i.1T=b;7(n===j){i.1t("1w");t.1c(9(){i.1T=j},i.6.1w)}l 7(n==="2k"){i.1t(i.6.2v);t.1c(9(){i.1T=j},i.6.2v)}l{i.1t("1m");t.1c(9(){i.1T=j},i.6.1m)}i.1L(s)}l{7(n===j){i.1r(s,i.6.1w)}l 7(n==="2k"){i.1r(s,i.6.2v)}l{i.1r(s,i.6.1m)}}i.2r()},2g:9(e){h t=c;7(A t.6.1Y==="9"){t.6.1Y.R(c,[t.$k])}7(e>=t.D||e===-1){e=t.D}l 7(e<=0){e=0}t.1t(0);7(t.F.1x===j){t.1L(t.J[e])}l{t.1r(t.J[e],1)}t.m=t.d.m=e;t.2r()},2r:9(){h e=c;e.26.2D(e.m);e.13=e.d.13=e.26[e.26.N-2];e.26.5f(0);7(e.13!==e.m){e.35();e.3e();e.2l();7(e.6.O!==b){e.3j()}}7(A e.6.3y==="9"&&e.13!==e.m){e.6.3y.R(c,[e.$k])}},X:9(){h e=c;e.3A="X";t.18(e.1C)},3j:9(){h e=c;7(e.3A!=="X"){e.19()}},19:9(){h e=c;e.3A="19";7(e.6.O===b){p b}t.18(e.1C);e.1C=t.4d(9(){e.U(j)},e.6.O)},1t:9(e){h t=c;7(e==="1m"){t.$K.z(t.2z(t.6.1m))}l 7(e==="1w"){t.$K.z(t.2z(t.6.1w))}l 7(A e!=="2Y"){t.$K.z(t.2z(e))}},2z:9(e){p{"-1G-1a":"2C "+e+"1z 2s","-1W-1a":"2C "+e+"1z 2s","-o-1a":"2C "+e+"1z 2s",1a:"2C "+e+"1z 2s"}},3H:9(){p{"-1G-1a":"","-1W-1a":"","-o-1a":"",1a:""}},3I:9(e){p{"-1G-P":"1i("+e+"V, C, C)","-1W-P":"1i("+e+"V, C, C)","-o-P":"1i("+e+"V, C, C)","-1z-P":"1i("+e+"V, C, C)",P:"1i("+e+"V, C,C)"}},1L:9(e){h t=c;t.$K.z(t.3I(e))},3L:9(e){h t=c;t.$K.z({T:e})},1r:9(e,t){h n=c;n.29=b;n.$K.X(j,j).4b({T:e},{54:t||n.6.1m,3M:9(){n.29=j}})},4E:9(){h e=c,r="1i(C, C, C)",i=n.56("L"),s,o,u,a;i.2w.3O="  -1W-P:"+r+"; -1z-P:"+r+"; -o-P:"+r+"; -1G-P:"+r+"; P:"+r;s=/1i\\(C, C, C\\)/g;o=i.2w.3O.5i(s);u=o!==14&&o.N===1;a="5z"38 t||t.5Q.4P;e.F={1x:u,15:a}},4q:9(){h e=c;7(e.6.27!==b||e.6.1U!==b){e.3Q();e.3R()}},4C:9(){h e=c,t=["s","e","x"];e.16={};7(e.6.27===j&&e.6.1U===j){t=["2X.d 21.d","2N.d 3U.d","2n.d 3V.d 28.d"]}l 7(e.6.27===b&&e.6.1U===j){t=["2X.d","2N.d","2n.d 3V.d"]}l 7(e.6.27===j&&e.6.1U===b){t=["21.d","3U.d","28.d"]}e.16.3W=t[0];e.16.2K=t[1];e.16.2J=t[2]},3R:9(){h t=c;t.$k.w("5y.d",9(e){e.1l()});t.$k.w("21.3X",9(t){p e(t.1d).2m("5C, 5E, 5F, 5N")})},3Q:9(){9 s(e){7(e.2b!==W){p{x:e.2b[0].2c,y:e.2b[0].41}}7(e.2b===W){7(e.2c!==W){p{x:e.2c,y:e.41}}7(e.2c===W){p{x:e.52,y:e.53}}}}9 o(t){7(t==="w"){e(n).w(r.16.2K,a);e(n).w(r.16.2J,f)}l 7(t==="Q"){e(n).Q(r.16.2K);e(n).Q(r.16.2J)}}9 u(n){h u=n.3h||n||t.3g,a;7(u.5a===3){p b}7(r.E<=r.6.q){p}7(r.29===b&&!r.6.3f){p b}7(r.1T===b&&!r.6.3f){p b}7(r.6.O!==b){t.18(r.1C)}7(r.F.15!==j&&!r.$K.1I("3b")){r.$K.I("3b")}r.11=0;r.Y=0;e(c).z(r.3H());a=e(c).2h();i.2S=a.T;i.2R=s(u).x-a.T;i.2P=s(u).y-a.5o;o("w");i.2j=b;i.2L=u.1d||u.4c}9 a(o){h u=o.3h||o||t.3g,a,f;r.11=s(u).x-i.2R;r.2I=s(u).y-i.2P;r.Y=r.11-i.2S;7(A r.6.2E==="9"&&i.3C!==j&&r.Y!==0){i.3C=j;r.6.2E.R(r,[r.$k])}7((r.Y>8||r.Y<-8)&&r.F.15===j){7(u.1l!==W){u.1l()}l{u.5L=b}i.2j=j}7((r.2I>10||r.2I<-10)&&i.2j===b){e(n).Q("2N.d")}a=9(){p r.Y/5};f=9(){p r.3z+r.Y/5};r.11=1F.3v(1F.3Y(r.11,a()),f());7(r.F.1x===j){r.1L(r.11)}l{r.3L(r.11)}}9 f(n){h s=n.3h||n||t.3g,u,a,f;s.1d=s.1d||s.4c;i.3C=b;7(r.F.15!==j){r.$K.Z("3b")}7(r.Y<0){r.1y=r.d.1y="T"}l{r.1y=r.d.1y="3i"}7(r.Y!==0){u=r.4j();r.1g(u,b,"4e");7(i.2L===s.1d&&r.F.15!==j){e(s.1d).w("3a.4k",9(t){t.4S();t.4T();t.1l();e(t.1d).Q("3a.4k")});a=e.4N(s.1d,"4V").3a;f=a.4W();a.4X(0,0,f)}}o("Q")}h r=c,i={2R:0,2P:0,4Y:0,2S:0,2h:14,4Z:14,50:14,2j:14,51:14,2L:14};r.29=j;r.$k.w(r.16.3W,".d-1p",u)},4j:9(){h e=c,t=e.4m();7(t>e.D){e.m=e.D;t=e.D}l 7(e.11>=0){t=0;e.m=0}p t},4m:9(){h t=c,n=t.6.12===j?t.3E:t.J,r=t.11,i=14;e.2f(n,9(s,o){7(r-t.M/20>n[s+1]&&r-t.M/20<o&&t.34()==="T"){i=o;7(t.6.12===j){t.m=e.4p(i,t.J)}l{t.m=s}}l 7(r+t.M/20<o&&r+t.M/20>(n[s+1]||n[s]-t.M)&&t.34()==="3i"){7(t.6.12===j){i=n[s+1]||n[n.N-1];t.m=e.4p(i,t.J)}l{i=n[s+1];t.m=s+1}}});p t.m},34:9(){h e=c,t;7(e.Y<0){t="3i";e.3u="U"}l{t="T";e.3u="1n"}p t},4A:9(){h e=c;e.$k.w("d.U",9(){e.U()});e.$k.w("d.1n",9(){e.1n()});e.$k.w("d.19",9(t,n){e.6.O=n;e.19();e.32="19"});e.$k.w("d.X",9(){e.X();e.32="X"});e.$k.w("d.1g",9(t,n){e.1g(n)});e.$k.w("d.2g",9(t,n){e.2g(n)})},2p:9(){h e=c;7(e.6.2p===j&&e.F.15!==j&&e.6.O!==b){e.$k.w("57",9(){e.X()});e.$k.w("58",9(){7(e.32!=="X"){e.19()}})}},1Z:9(){h t=c,n,r,i,s,o;7(t.6.1Z===b){p b}1A(n=0;n<t.E;n+=1){r=e(t.$G[n]);7(r.v("d-1e")==="1e"){4s}i=r.v("d-1K");s=r.17(".5b");7(A s.v("1J")!=="2Y"){r.v("d-1e","1e");4s}7(r.v("d-1e")===W){s.3K();r.I("4u").v("d-1e","5e")}7(t.6.4v===j){o=i>=t.m}l{o=j}7(o&&i<t.m+t.6.q&&s.N){t.4w(r,s)}}},4w:9(e,n){9 o(){e.v("d-1e","1e").Z("4u");n.5h("v-1J");7(r.6.4x==="4y"){n.5j(5k)}l{n.3J()}7(A r.6.2T==="9"){r.6.2T.R(c,[r.$k])}}9 u(){i+=1;7(r.2Q(n.3l(0))||s===j){o()}l 7(i<=2q){t.1c(u,2q)}l{o()}}h r=c,i=0,s;7(n.5p("5q")==="5r"){n.z("5s-5t","5u("+n.v("1J")+")");s=j}l{n[0].1J=n.v("1J")}u()},1B:9(){9 s(){h r=e(n.$G[n.m]).2G();n.1H.z("2G",r+"V");7(!n.1H.1I("1B")){t.1c(9(){n.1H.I("1B")},0)}}9 o(){i+=1;7(n.2Q(r.3l(0))){s()}l 7(i<=2q){t.1c(o,2q)}l{n.1H.z("2G","")}}h n=c,r=e(n.$G[n.m]).17("5w"),i;7(r.3l(0)!==W){i=0;o()}l{s()}},2Q:9(e){h t;7(!e.3M){p b}t=A e.4D;7(t!=="W"&&e.4D===0){p b}p j},4g:9(){h t=c,n;7(t.6.2F===j){t.$G.Z("2d")}t.1D=[];1A(n=t.m;n<t.m+t.6.q;n+=1){t.1D.2D(n);7(t.6.2F===j){e(t.$G[n]).I("2d")}}t.d.1D=t.1D},4n:9(e){h t=c;t.4G="d-"+e+"-5B";t.4H="d-"+e+"-38"},4l:9(){9 a(e){p{2h:"5D",T:e+"V"}}h e=c,t=e.4G,n=e.4H,r=e.$G.1S(e.m),i=e.$G.1S(e.13),s=1F.4J(e.J[e.m])+e.J[e.13],o=1F.4J(e.J[e.m])+e.M/2,u="5G 5H 5I 5J";e.1E=j;e.$K.I("d-1P").z({"-1G-P-1P":o+"V","-1W-4K-1P":o+"V","4K-1P":o+"V"});i.z(a(s,10)).I(t).w(u,9(){e.3m=j;i.Q(u);e.31(i,t)});r.I(n).w(u,9(){e.36=j;r.Q(u);e.31(r,n)})},31:9(e,t){h n=c;e.z({2h:"",T:""}).Z(t);7(n.3m&&n.36){n.$K.Z("d-1P");n.3m=b;n.36=b;n.1E=b}},4o:9(){h e=c;e.d={2A:e.2A,5P:e.$k,S:e.$S,G:e.$G,m:e.m,13:e.13,1D:e.1D,15:e.F.15,F:e.F,1y:e.1y}},3G:9(){h r=c;r.$k.Q(".d d 21.3X");e(n).Q(".d d");e(t).Q("44",r.3d)},1V:9(){h e=c;7(e.$k.25().N!==0){e.$K.3r();e.$S.3r().3r();7(e.B){e.B.3k()}}e.3G();e.$k.2x("2w",e.$k.v("d-4I")||"").2x("H",e.$k.v("d-4F"))},5T:9(){h e=c;e.X();t.18(e.1X);e.1V();e.$k.5U()},5V:9(t){h n=c,r=e.4M({},n.2A,t);n.1V();n.1N(r,n.$k)},5W:9(e,t){h n=c,r;7(!e){p b}7(n.$k.25().N===0){n.$k.1o(e);n.23();p b}n.1V();7(t===W||t===-1){r=-1}l{r=t}7(r>=n.$S.N||r===-1){n.$S.1S(-1).5X(e)}l{n.$S.1S(r).5Y(e)}n.23()},5Z:9(e){h t=c,n;7(t.$k.25().N===0){p b}7(e===W||e===-1){n=-1}l{n=e}t.1V();t.$S.1S(n).3k();t.23()}};e.37.2B=9(t){p c.2f(9(){7(e(c).v("d-1N")===j){p b}e(c).v("d-1N",j);h n=3c.3q(r);n.1N(t,c);e.v(c,"2B",n)})};e.37.2B.6={q:5,1h:b,1s:[60,4],1O:[61,3],22:[62,2],1Q:b,1R:[63,1],48:b,46:b,1m:2M,1w:64,2v:65,O:b,2p:b,2a:b,2U:["1n","U"],2e:j,12:b,1v:j,39:b,2Z:j,45:2M,47:t,1M:"d-66",2i:"d-2i",1Z:b,4v:j,4x:"4y",1B:b,2O:b,33:b,3f:j,27:j,1U:j,2F:b,2o:b,3B:b,3D:b,2H:b,3s:b,1Y:b,3y:b,3w:b,2E:b,2T:b}})(67,68,69)',62,382,'||||||options|if||function||false|this|owl||||var||true|elem|else|currentItem|||return|items|||||data|on|||css|typeof|owlControls|0px|maximumItem|itemsAmount|browser|owlItems|class|addClass|positionsInArray|owlWrapper|div|itemWidth|length|autoPlay|transform|off|apply|userItems|left|next|px|undefined|stop|newRelativeX|removeClass||newPosX|scrollPerPage|prevItem|null|isTouch|ev_types|find|clearInterval|play|transition|disabled|setTimeout|target|loaded|width|goTo|itemsCustom|translate3d|page|paginationWrapper|preventDefault|slideSpeed|prev|append|wrapper|buttonNext|css2slide|itemsDesktop|swapSpeed|buttonPrev|pagination|paginationSpeed|support3d|dragDirection|ms|for|autoHeight|autoPlayInterval|visibleItems|isTransition|Math|webkit|wrapperOuter|hasClass|src|item|transition3d|baseClass|init|itemsDesktopSmall|origin|itemsTabletSmall|itemsMobile|eq|isCss3Finish|touchDrag|unWrap|moz|checkVisible|beforeMove|lazyLoad||mousedown|itemsTablet|setVars|roundPages|children|prevArr|mouseDrag|mouseup|isCssFinish|navigation|touches|pageX|active|rewindNav|each|jumpTo|position|theme|sliding|rewind|eachMoveUpdate|is|touchend|transitionStyle|stopOnHover|100|afterGo|ease|orignalItems|opacity|rewindSpeed|style|attr|html|addCssSpeed|userOptions|owlCarousel|all|push|startDragging|addClassActive|height|beforeInit|newPosY|end|move|targetElement|200|touchmove|jsonPath|offsetY|completeImg|offsetX|relativePos|afterLazyLoad|navigationText|updateItems|calculateAll|touchstart|string|responsive|updateControls|clearTransStyle|hoverStatus|jsonSuccess|moveDirection|checkPagination|endCurrent|fn|in|paginationNumbers|click|grabbing|Object|resizer|checkNavigation|dragBeforeAnimFinish|event|originalEvent|right|checkAp|remove|get|endPrev|visible|watchVisibility|Number|create|unwrap|afterInit|logIn|playDirection|max|afterAction|updateVars|afterMove|maximumPixels|apStatus|beforeUpdate|dragging|afterUpdate|pagesInArray|reload|clearEvents|removeTransition|doTranslate|show|hide|css2move|complete|span|cssText|updatePagination|gestures|disabledEvents|buildButtons|buildPagination|mousemove|touchcancel|start|disableTextSelect|min|loops|calculateWidth|pageY|appendWrapperSizes|appendItemsSizes|resize|responsiveRefreshRate|itemsScaleUp|responsiveBaseWidth|singleItem|outer|wrap|animate|srcElement|setInterval|drag|updatePosition|onVisibleItems|block|display|getNewPosition|disable|singleItemTransition|closestItem|transitionTypes|owlStatus|inArray|moveEvents|response|continue|buildControls|loading|lazyFollow|lazyPreload|lazyEffect|fade|onStartup|customEvents|wrapItems|eventTypes|naturalWidth|checkBrowser|originalClasses|outClass|inClass|originalStyles|abs|perspective|loadContent|extend|_data|round|msMaxTouchPoints|5e3|text|stopImmediatePropagation|stopPropagation|buttons|events|pop|splice|baseElWidth|minSwipe|maxSwipe|dargging|clientX|clientY|duration|destroyControls|createElement|mouseover|mouseout|numbers|which|lazyOwl|appendTo|clearTimeout|checked|shift|sort|removeAttr|match|fadeIn|400|clickable|toggleClass|wrapAll|top|prop|tagName|DIV|background|image|url|wrapperWidth|img|500|dragstart|ontouchstart|controls|out|input|relative|textarea|select|webkitAnimationEnd|oAnimationEnd|MSAnimationEnd|animationend|getJSON|returnValue|hasOwnProperty|option|onstartup|baseElement|navigator|new|prototype|destroy|removeData|reinit|addItem|after|before|removeItem|1199|979|768|479|800|1e3|carousel|jQuery|window|document'.split('|'),0,{}));

// Generated by CoffeeScript 1.6.2
/*
Sticky Elements Shortcut for jQuery Waypoints - v2.0.4
Copyright (c) 2011-2014 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
(function(){(function(t,n){if(typeof define==="function"&&define.amd){return define(["jquery","waypoints"],n)}else{return n(t.jQuery)}})(this,function(t){var n,s;n={wrapper:'<div class="sticky-wrapper" />',stuckClass:"stuck"};s=function(t,n){t.wrap(n.wrapper);return t.parent()};t.waypoints("extendFn","sticky",function(e){var i,r,a;r=t.extend({},t.fn.waypoint.defaults,n,e);i=s(this,r);a=r.handler;r.handler=function(n){var s,e;s=t(this).children(":first");e=n==="down"||n==="right";i.height(e?s.outerHeight():"");s.toggleClass(r.stuckClass,e);if(a!=null){return a.call(this,n)}};i.waypoint(r);return this.data("stuckClass",r.stuckClass)});return t.waypoints("extendFn","unsticky",function(){this.parent().waypoint("destroy");this.unwrap();return this.removeClass(this.data("stuckClass"))})})}).call(this);

/* jquery.nicescroll 3.5.4 InuYaksa*2013 MIT http://areaaperta.com/nicescroll */(function(e){"function"===typeof define&&define.amd?define(["jquery"],e):e(jQuery)})(function(e){var y=!1,C=!1,J=5E3,K=2E3,x=0,F=["ms","moz","webkit","o"],s=window.requestAnimationFrame||!1,v=window.cancelAnimationFrame||!1;if(!s)for(var L in F){var D=F[L];s||(s=window[D+"RequestAnimationFrame"]);v||(v=window[D+"CancelAnimationFrame"]||window[D+"CancelRequestAnimationFrame"])}var z=window.MutationObserver||window.WebKitMutationObserver||!1,G={zindex:"auto",cursoropacitymin:0,cursoropacitymax:1,cursorcolor:"#424242",
cursorwidth:"5px",cursorborder:"1px solid #fff",cursorborderradius:"5px",scrollspeed:60,mousescrollstep:24,touchbehavior:!1,hwacceleration:!0,usetransition:!0,boxzoom:!1,dblclickzoom:!0,gesturezoom:!0,grabcursorenabled:!0,autohidemode:!0,background:"",iframeautoresize:!0,cursorminheight:32,preservenativescrolling:!0,railoffset:!1,bouncescroll:!0,spacebarenabled:!0,railpadding:{top:0,right:0,left:0,bottom:0},disableoutline:!0,horizrailenabled:!0,railalign:"right",railvalign:"bottom",enabletranslate3d:!0,
enablemousewheel:!0,enablekeyboard:!0,smoothscroll:!0,sensitiverail:!0,enablemouselockapi:!0,cursorfixedheight:!1,directionlockdeadzone:6,hidecursordelay:400,nativeparentscrolling:!0,enablescrollonselection:!0,overflowx:!0,overflowy:!0,cursordragspeed:0.3,rtlmode:"auto",cursordragontouch:!1,oneaxismousemode:"auto",scriptpath:function(){var e=document.getElementsByTagName("script"),e=e[e.length-1].src.split("?")[0];return 0<e.split("/").length?e.split("/").slice(0,-1).join("/")+"/":""}()},E=!1,M=function(){if(E)return E;
var e=document.createElement("DIV"),b={haspointerlock:"pointerLockElement"in document||"mozPointerLockElement"in document||"webkitPointerLockElement"in document};b.isopera="opera"in window;b.isopera12=b.isopera&&"getUserMedia"in navigator;b.isoperamini="[object OperaMini]"===Object.prototype.toString.call(window.operamini);b.isie="all"in document&&"attachEvent"in e&&!b.isopera;b.isieold=b.isie&&!("msInterpolationMode"in e.style);b.isie7=b.isie&&!b.isieold&&(!("documentMode"in document)||7==document.documentMode);
b.isie8=b.isie&&"documentMode"in document&&8==document.documentMode;b.isie9=b.isie&&"performance"in window&&9<=document.documentMode;b.isie10=b.isie&&"performance"in window&&10<=document.documentMode;b.isie9mobile=/iemobile.9/i.test(navigator.userAgent);b.isie9mobile&&(b.isie9=!1);b.isie7mobile=!b.isie9mobile&&b.isie7&&/iemobile/i.test(navigator.userAgent);b.ismozilla="MozAppearance"in e.style;b.iswebkit="WebkitAppearance"in e.style;b.ischrome="chrome"in window;b.ischrome22=b.ischrome&&b.haspointerlock;
b.ischrome26=b.ischrome&&"transition"in e.style;b.cantouch="ontouchstart"in document.documentElement||"ontouchstart"in window;b.hasmstouch=window.navigator.msPointerEnabled||!1;b.ismac=/^mac$/i.test(navigator.platform);b.isios=b.cantouch&&/iphone|ipad|ipod/i.test(navigator.platform);b.isios4=b.isios&&!("seal"in Object);b.isandroid=/android/i.test(navigator.userAgent);b.trstyle=!1;b.hastransform=!1;b.hastranslate3d=!1;b.transitionstyle=!1;b.hastransition=!1;b.transitionend=!1;for(var h=["transform",
"msTransform","webkitTransform","MozTransform","OTransform"],k=0;k<h.length;k++)if("undefined"!=typeof e.style[h[k]]){b.trstyle=h[k];break}b.hastransform=!1!=b.trstyle;b.hastransform&&(e.style[b.trstyle]="translate3d(1px,2px,3px)",b.hastranslate3d=/translate3d/.test(e.style[b.trstyle]));b.transitionstyle=!1;b.prefixstyle="";b.transitionend=!1;for(var h="transition webkitTransition MozTransition OTransition OTransition msTransition KhtmlTransition".split(" "),l=" -webkit- -moz- -o- -o -ms- -khtml-".split(" "),
q="transitionend webkitTransitionEnd transitionend otransitionend oTransitionEnd msTransitionEnd KhtmlTransitionEnd".split(" "),k=0;k<h.length;k++)if(h[k]in e.style){b.transitionstyle=h[k];b.prefixstyle=l[k];b.transitionend=q[k];break}b.ischrome26&&(b.prefixstyle=l[1]);b.hastransition=b.transitionstyle;a:{h=["-moz-grab","-webkit-grab","grab"];if(b.ischrome&&!b.ischrome22||b.isie)h=[];for(k=0;k<h.length;k++)if(l=h[k],e.style.cursor=l,e.style.cursor==l){h=l;break a}h="url(http://www.google.com/intl/en_ALL/mapfiles/openhand.cur),n-resize"}b.cursorgrabvalue=
h;b.hasmousecapture="setCapture"in e;b.hasMutationObserver=!1!==z;return E=b},N=function(g,b){function h(){var c=a.win;if("zIndex"in c)return c.zIndex();for(;0<c.length&&9!=c[0].nodeType;){var b=c.css("zIndex");if(!isNaN(b)&&0!=b)return parseInt(b);c=c.parent()}return!1}function k(c,b,f){b=c.css(b);c=parseFloat(b);return isNaN(c)?(c=w[b]||0,f=3==c?f?a.win.outerHeight()-a.win.innerHeight():a.win.outerWidth()-a.win.innerWidth():1,a.isie8&&c&&(c+=1),f?c:0):c}function l(c,b,f,e){a._bind(c,b,function(a){a=
a?a:window.event;var e={original:a,target:a.target||a.srcElement,type:"wheel",deltaMode:"MozMousePixelScroll"==a.type?0:1,deltaX:0,deltaZ:0,preventDefault:function(){a.preventDefault?a.preventDefault():a.returnValue=!1;return!1},stopImmediatePropagation:function(){a.stopImmediatePropagation?a.stopImmediatePropagation():a.cancelBubble=!0}};"mousewheel"==b?(e.deltaY=-0.025*a.wheelDelta,a.wheelDeltaX&&(e.deltaX=-0.025*a.wheelDeltaX)):e.deltaY=a.detail;return f.call(c,e)},e)}function q(c,b,f){var e,d;
0==c.deltaMode?(e=-Math.floor(c.deltaX*(a.opt.mousescrollstep/54)),d=-Math.floor(c.deltaY*(a.opt.mousescrollstep/54))):1==c.deltaMode&&(e=-Math.floor(c.deltaX*a.opt.mousescrollstep),d=-Math.floor(c.deltaY*a.opt.mousescrollstep));b&&(a.opt.oneaxismousemode&&0==e&&d)&&(e=d,d=0);e&&(a.scrollmom&&a.scrollmom.stop(),a.lastdeltax+=e,a.debounced("mousewheelx",function(){var c=a.lastdeltax;a.lastdeltax=0;a.rail.drag||a.doScrollLeftBy(c)},15));if(d){if(a.opt.nativeparentscrolling&&f&&!a.ispage&&!a.zoomactive)if(0>
d){if(a.getScrollTop()>=a.page.maxh)return!0}else if(0>=a.getScrollTop())return!0;a.scrollmom&&a.scrollmom.stop();a.lastdeltay+=d;a.debounced("mousewheely",function(){var c=a.lastdeltay;a.lastdeltay=0;a.rail.drag||a.doScrollBy(c)},15)}c.stopImmediatePropagation();return c.preventDefault()}var a=this;this.version="3.5.4";this.name="nicescroll";this.me=b;this.opt={doc:e("body"),win:!1};e.extend(this.opt,G);this.opt.snapbackspeed=80;if(g)for(var p in a.opt)"undefined"!=typeof g[p]&&(a.opt[p]=g[p]);this.iddoc=
(this.doc=a.opt.doc)&&this.doc[0]?this.doc[0].id||"":"";this.ispage=/^BODY|HTML/.test(a.opt.win?a.opt.win[0].nodeName:this.doc[0].nodeName);this.haswrapper=!1!==a.opt.win;this.win=a.opt.win||(this.ispage?e(window):this.doc);this.docscroll=this.ispage&&!this.haswrapper?e(window):this.win;this.body=e("body");this.iframe=this.isfixed=this.viewport=!1;this.isiframe="IFRAME"==this.doc[0].nodeName&&"IFRAME"==this.win[0].nodeName;this.istextarea="TEXTAREA"==this.win[0].nodeName;this.forcescreen=!1;this.canshowonmouseevent=
"scroll"!=a.opt.autohidemode;this.page=this.view=this.onzoomout=this.onzoomin=this.onscrollcancel=this.onscrollend=this.onscrollstart=this.onclick=this.ongesturezoom=this.onkeypress=this.onmousewheel=this.onmousemove=this.onmouseup=this.onmousedown=!1;this.scroll={x:0,y:0};this.scrollratio={x:0,y:0};this.cursorheight=20;this.scrollvaluemax=0;this.observerremover=this.observer=this.scrollmom=this.scrollrunning=this.isrtlmode=!1;do this.id="ascrail"+K++;while(document.getElementById(this.id));this.hasmousefocus=
this.hasfocus=this.zoomactive=this.zoom=this.selectiondrag=this.cursorfreezed=this.cursor=this.rail=!1;this.visibility=!0;this.hidden=this.locked=!1;this.cursoractive=!0;this.wheelprevented=!1;this.overflowx=a.opt.overflowx;this.overflowy=a.opt.overflowy;this.nativescrollingarea=!1;this.checkarea=0;this.events=[];this.saved={};this.delaylist={};this.synclist={};this.lastdeltay=this.lastdeltax=0;this.detected=M();var d=e.extend({},this.detected);this.ishwscroll=(this.canhwscroll=d.hastransform&&a.opt.hwacceleration)&&
a.haswrapper;this.istouchcapable=!1;d.cantouch&&(d.ischrome&&!d.isios&&!d.isandroid)&&(this.istouchcapable=!0,d.cantouch=!1);d.cantouch&&(d.ismozilla&&!d.isios&&!d.isandroid)&&(this.istouchcapable=!0,d.cantouch=!1);a.opt.enablemouselockapi||(d.hasmousecapture=!1,d.haspointerlock=!1);this.delayed=function(c,b,f,e){var d=a.delaylist[c],h=(new Date).getTime();if(!e&&d&&d.tt)return!1;d&&d.tt&&clearTimeout(d.tt);if(d&&d.last+f>h&&!d.tt)a.delaylist[c]={last:h+f,tt:setTimeout(function(){a&&(a.delaylist[c].tt=
0,b.call())},f)};else if(!d||!d.tt)a.delaylist[c]={last:h,tt:0},setTimeout(function(){b.call()},0)};this.debounced=function(c,b,f){var d=a.delaylist[c];(new Date).getTime();a.delaylist[c]=b;d||setTimeout(function(){var b=a.delaylist[c];a.delaylist[c]=!1;b.call()},f)};var r=!1;this.synched=function(c,b){a.synclist[c]=b;(function(){r||(s(function(){r=!1;for(c in a.synclist){var b=a.synclist[c];b&&b.call(a);a.synclist[c]=!1}}),r=!0)})();return c};this.unsynched=function(c){a.synclist[c]&&(a.synclist[c]=
!1)};this.css=function(c,b){for(var f in b)a.saved.css.push([c,f,c.css(f)]),c.css(f,b[f])};this.scrollTop=function(c){return"undefined"==typeof c?a.getScrollTop():a.setScrollTop(c)};this.scrollLeft=function(c){return"undefined"==typeof c?a.getScrollLeft():a.setScrollLeft(c)};BezierClass=function(a,b,f,d,e,h,k){this.st=a;this.ed=b;this.spd=f;this.p1=d||0;this.p2=e||1;this.p3=h||0;this.p4=k||1;this.ts=(new Date).getTime();this.df=this.ed-this.st};BezierClass.prototype={B2:function(a){return 3*a*a*(1-
a)},B3:function(a){return 3*a*(1-a)*(1-a)},B4:function(a){return(1-a)*(1-a)*(1-a)},getNow:function(){var a=1-((new Date).getTime()-this.ts)/this.spd,b=this.B2(a)+this.B3(a)+this.B4(a);return 0>a?this.ed:this.st+Math.round(this.df*b)},update:function(a,b){this.st=this.getNow();this.ed=a;this.spd=b;this.ts=(new Date).getTime();this.df=this.ed-this.st;return this}};if(this.ishwscroll){this.doc.translate={x:0,y:0,tx:"0px",ty:"0px"};d.hastranslate3d&&d.isios&&this.doc.css("-webkit-backface-visibility",
"hidden");var t=function(){var c=a.doc.css(d.trstyle);return c&&"matrix"==c.substr(0,6)?c.replace(/^.*\((.*)\)$/g,"$1").replace(/px/g,"").split(/, +/):!1};this.getScrollTop=function(c){if(!c){if(c=t())return 16==c.length?-c[13]:-c[5];if(a.timerscroll&&a.timerscroll.bz)return a.timerscroll.bz.getNow()}return a.doc.translate.y};this.getScrollLeft=function(c){if(!c){if(c=t())return 16==c.length?-c[12]:-c[4];if(a.timerscroll&&a.timerscroll.bh)return a.timerscroll.bh.getNow()}return a.doc.translate.x};
this.notifyScrollEvent=document.createEvent?function(a){var b=document.createEvent("UIEvents");b.initUIEvent("scroll",!1,!0,window,1);a.dispatchEvent(b)}:document.fireEvent?function(a){var b=document.createEventObject();a.fireEvent("onscroll");b.cancelBubble=!0}:function(a,b){};d.hastranslate3d&&a.opt.enabletranslate3d?(this.setScrollTop=function(c,b){a.doc.translate.y=c;a.doc.translate.ty=-1*c+"px";a.doc.css(d.trstyle,"translate3d("+a.doc.translate.tx+","+a.doc.translate.ty+",0px)");b||a.notifyScrollEvent(a.win[0])},
this.setScrollLeft=function(c,b){a.doc.translate.x=c;a.doc.translate.tx=-1*c+"px";a.doc.css(d.trstyle,"translate3d("+a.doc.translate.tx+","+a.doc.translate.ty+",0px)");b||a.notifyScrollEvent(a.win[0])}):(this.setScrollTop=function(c,b){a.doc.translate.y=c;a.doc.translate.ty=-1*c+"px";a.doc.css(d.trstyle,"translate("+a.doc.translate.tx+","+a.doc.translate.ty+")");b||a.notifyScrollEvent(a.win[0])},this.setScrollLeft=function(c,b){a.doc.translate.x=c;a.doc.translate.tx=-1*c+"px";a.doc.css(d.trstyle,
"translate("+a.doc.translate.tx+","+a.doc.translate.ty+")");b||a.notifyScrollEvent(a.win[0])})}else this.getScrollTop=function(){return a.docscroll.scrollTop()},this.setScrollTop=function(c){return a.docscroll.scrollTop(c)},this.getScrollLeft=function(){return a.docscroll.scrollLeft()},this.setScrollLeft=function(c){return a.docscroll.scrollLeft(c)};this.getTarget=function(a){return!a?!1:a.target?a.target:a.srcElement?a.srcElement:!1};this.hasParent=function(a,b){if(!a)return!1;for(var f=a.target||
a.srcElement||a||!1;f&&f.id!=b;)f=f.parentNode||!1;return!1!==f};var w={thin:1,medium:3,thick:5};this.getOffset=function(){if(a.isfixed)return{top:parseFloat(a.win.css("top")),left:parseFloat(a.win.css("left"))};if(!a.viewport)return a.win.offset();var c=a.win.offset(),b=a.viewport.offset();return{top:c.top-b.top+a.viewport.scrollTop(),left:c.left-b.left+a.viewport.scrollLeft()}};this.updateScrollBar=function(c){if(a.ishwscroll)a.rail.css({height:a.win.innerHeight()}),a.railh&&a.railh.css({width:a.win.innerWidth()});
else{var b=a.getOffset(),f=b.top,d=b.left,f=f+k(a.win,"border-top-width",!0);a.win.outerWidth();a.win.innerWidth();var d=d+(a.rail.align?a.win.outerWidth()-k(a.win,"border-right-width")-a.rail.width:k(a.win,"border-left-width")),e=a.opt.railoffset;e&&(e.top&&(f+=e.top),a.rail.align&&e.left&&(d+=e.left));a.locked||a.rail.css({top:f,left:d,height:c?c.h:a.win.innerHeight()});a.zoom&&a.zoom.css({top:f+1,left:1==a.rail.align?d-20:d+a.rail.width+4});a.railh&&!a.locked&&(f=b.top,d=b.left,c=a.railh.align?
f+k(a.win,"border-top-width",!0)+a.win.innerHeight()-a.railh.height:f+k(a.win,"border-top-width",!0),d+=k(a.win,"border-left-width"),a.railh.css({top:c,left:d,width:a.railh.width}))}};this.doRailClick=function(c,b,f){var d;a.locked||(a.cancelEvent(c),b?(b=f?a.doScrollLeft:a.doScrollTop,d=f?(c.pageX-a.railh.offset().left-a.cursorwidth/2)*a.scrollratio.x:(c.pageY-a.rail.offset().top-a.cursorheight/2)*a.scrollratio.y,b(d)):(b=f?a.doScrollLeftBy:a.doScrollBy,d=f?a.scroll.x:a.scroll.y,c=f?c.pageX-a.railh.offset().left:
c.pageY-a.rail.offset().top,f=f?a.view.w:a.view.h,d>=c?b(f):b(-f)))};a.hasanimationframe=s;a.hascancelanimationframe=v;a.hasanimationframe?a.hascancelanimationframe||(v=function(){a.cancelAnimationFrame=!0}):(s=function(a){return setTimeout(a,15-Math.floor(+new Date/1E3)%16)},v=clearInterval);this.init=function(){a.saved.css=[];if(d.isie7mobile||d.isoperamini)return!0;d.hasmstouch&&a.css(a.ispage?e("html"):a.win,{"-ms-touch-action":"none"});a.zindex="auto";a.zindex=!a.ispage&&"auto"==a.opt.zindex?
h()||"auto":a.opt.zindex;!a.ispage&&"auto"!=a.zindex&&a.zindex>x&&(x=a.zindex);a.isie&&(0==a.zindex&&"auto"==a.opt.zindex)&&(a.zindex="auto");if(!a.ispage||!d.cantouch&&!d.isieold&&!d.isie9mobile){var c=a.docscroll;a.ispage&&(c=a.haswrapper?a.win:a.doc);d.isie9mobile||a.css(c,{"overflow-y":"hidden"});a.ispage&&d.isie7&&("BODY"==a.doc[0].nodeName?a.css(e("html"),{"overflow-y":"hidden"}):"HTML"==a.doc[0].nodeName&&a.css(e("body"),{"overflow-y":"hidden"}));d.isios&&(!a.ispage&&!a.haswrapper)&&a.css(e("body"),
{"-webkit-overflow-scrolling":"touch"});var b=e(document.createElement("div"));b.css({position:"relative",top:0,"float":"right",width:a.opt.cursorwidth,height:"0px","background-color":a.opt.cursorcolor,border:a.opt.cursorborder,"background-clip":"padding-box","-webkit-border-radius":a.opt.cursorborderradius,"-moz-border-radius":a.opt.cursorborderradius,"border-radius":a.opt.cursorborderradius});b.hborder=parseFloat(b.outerHeight()-b.innerHeight());a.cursor=b;var f=e(document.createElement("div"));
f.attr("id",a.id);f.addClass("nicescroll-rails");var u,k,g=["left","right"],l;for(l in g)k=g[l],(u=a.opt.railpadding[k])?f.css("padding-"+k,u+"px"):a.opt.railpadding[k]=0;f.append(b);f.width=Math.max(parseFloat(a.opt.cursorwidth),b.outerWidth())+a.opt.railpadding.left+a.opt.railpadding.right;f.css({width:f.width+"px",zIndex:a.zindex,background:a.opt.background,cursor:"default"});f.visibility=!0;f.scrollable=!0;f.align="left"==a.opt.railalign?0:1;a.rail=f;b=a.rail.drag=!1;a.opt.boxzoom&&(!a.ispage&&
!d.isieold)&&(b=document.createElement("div"),a.bind(b,"click",a.doZoom),a.zoom=e(b),a.zoom.css({cursor:"pointer","z-index":a.zindex,backgroundImage:"url("+a.opt.scriptpath+"zoomico.png)",height:18,width:18,backgroundPosition:"0px 0px"}),a.opt.dblclickzoom&&a.bind(a.win,"dblclick",a.doZoom),d.cantouch&&a.opt.gesturezoom&&(a.ongesturezoom=function(c){1.5<c.scale&&a.doZoomIn(c);0.8>c.scale&&a.doZoomOut(c);return a.cancelEvent(c)},a.bind(a.win,"gestureend",a.ongesturezoom)));a.railh=!1;if(a.opt.horizrailenabled){a.css(c,
{"overflow-x":"hidden"});b=e(document.createElement("div"));b.css({position:"relative",top:0,height:a.opt.cursorwidth,width:"0px","background-color":a.opt.cursorcolor,border:a.opt.cursorborder,"background-clip":"padding-box","-webkit-border-radius":a.opt.cursorborderradius,"-moz-border-radius":a.opt.cursorborderradius,"border-radius":a.opt.cursorborderradius});b.wborder=parseFloat(b.outerWidth()-b.innerWidth());a.cursorh=b;var m=e(document.createElement("div"));m.attr("id",a.id+"-hr");m.addClass("nicescroll-rails");
m.height=Math.max(parseFloat(a.opt.cursorwidth),b.outerHeight());m.css({height:m.height+"px",zIndex:a.zindex,background:a.opt.background});m.append(b);m.visibility=!0;m.scrollable=!0;m.align="top"==a.opt.railvalign?0:1;a.railh=m;a.railh.drag=!1}a.ispage?(f.css({position:"fixed",top:"0px",height:"100%"}),f.align?f.css({right:"0px"}):f.css({left:"0px"}),a.body.append(f),a.railh&&(m.css({position:"fixed",left:"0px",width:"100%"}),m.align?m.css({bottom:"0px"}):m.css({top:"0px"}),a.body.append(m))):(a.ishwscroll?
("static"==a.win.css("position")&&a.css(a.win,{position:"relative"}),c="HTML"==a.win[0].nodeName?a.body:a.win,a.zoom&&(a.zoom.css({position:"absolute",top:1,right:0,"margin-right":f.width+4}),c.append(a.zoom)),f.css({position:"absolute",top:0}),f.align?f.css({right:0}):f.css({left:0}),c.append(f),m&&(m.css({position:"absolute",left:0,bottom:0}),m.align?m.css({bottom:0}):m.css({top:0}),c.append(m))):(a.isfixed="fixed"==a.win.css("position"),c=a.isfixed?"fixed":"absolute",a.isfixed||(a.viewport=a.getViewport(a.win[0])),
a.viewport&&(a.body=a.viewport,!1==/fixed|relative|absolute/.test(a.viewport.css("position"))&&a.css(a.viewport,{position:"relative"})),f.css({position:c}),a.zoom&&a.zoom.css({position:c}),a.updateScrollBar(),a.body.append(f),a.zoom&&a.body.append(a.zoom),a.railh&&(m.css({position:c}),a.body.append(m))),d.isios&&a.css(a.win,{"-webkit-tap-highlight-color":"rgba(0,0,0,0)","-webkit-touch-callout":"none"}),d.isie&&a.opt.disableoutline&&a.win.attr("hideFocus","true"),d.iswebkit&&a.opt.disableoutline&&
a.win.css({outline:"none"}));!1===a.opt.autohidemode?(a.autohidedom=!1,a.rail.css({opacity:a.opt.cursoropacitymax}),a.railh&&a.railh.css({opacity:a.opt.cursoropacitymax})):!0===a.opt.autohidemode||"leave"===a.opt.autohidemode?(a.autohidedom=e().add(a.rail),d.isie8&&(a.autohidedom=a.autohidedom.add(a.cursor)),a.railh&&(a.autohidedom=a.autohidedom.add(a.railh)),a.railh&&d.isie8&&(a.autohidedom=a.autohidedom.add(a.cursorh))):"scroll"==a.opt.autohidemode?(a.autohidedom=e().add(a.rail),a.railh&&(a.autohidedom=
a.autohidedom.add(a.railh))):"cursor"==a.opt.autohidemode?(a.autohidedom=e().add(a.cursor),a.railh&&(a.autohidedom=a.autohidedom.add(a.cursorh))):"hidden"==a.opt.autohidemode&&(a.autohidedom=!1,a.hide(),a.locked=!1);if(d.isie9mobile)a.scrollmom=new H(a),a.onmangotouch=function(c){c=a.getScrollTop();var b=a.getScrollLeft();if(c==a.scrollmom.lastscrolly&&b==a.scrollmom.lastscrollx)return!0;var f=c-a.mangotouch.sy,d=b-a.mangotouch.sx;if(0!=Math.round(Math.sqrt(Math.pow(d,2)+Math.pow(f,2)))){var n=0>
f?-1:1,e=0>d?-1:1,h=+new Date;a.mangotouch.lazy&&clearTimeout(a.mangotouch.lazy);80<h-a.mangotouch.tm||a.mangotouch.dry!=n||a.mangotouch.drx!=e?(a.scrollmom.stop(),a.scrollmom.reset(b,c),a.mangotouch.sy=c,a.mangotouch.ly=c,a.mangotouch.sx=b,a.mangotouch.lx=b,a.mangotouch.dry=n,a.mangotouch.drx=e,a.mangotouch.tm=h):(a.scrollmom.stop(),a.scrollmom.update(a.mangotouch.sx-d,a.mangotouch.sy-f),a.mangotouch.tm=h,f=Math.max(Math.abs(a.mangotouch.ly-c),Math.abs(a.mangotouch.lx-b)),a.mangotouch.ly=c,a.mangotouch.lx=
b,2<f&&(a.mangotouch.lazy=setTimeout(function(){a.mangotouch.lazy=!1;a.mangotouch.dry=0;a.mangotouch.drx=0;a.mangotouch.tm=0;a.scrollmom.doMomentum(30)},100)))}},f=a.getScrollTop(),m=a.getScrollLeft(),a.mangotouch={sy:f,ly:f,dry:0,sx:m,lx:m,drx:0,lazy:!1,tm:0},a.bind(a.docscroll,"scroll",a.onmangotouch);else{if(d.cantouch||a.istouchcapable||a.opt.touchbehavior||d.hasmstouch){a.scrollmom=new H(a);a.ontouchstart=function(c){if(c.pointerType&&2!=c.pointerType)return!1;a.hasmoving=!1;if(!a.locked){if(d.hasmstouch)for(var b=
c.target?c.target:!1;b;){var f=e(b).getNiceScroll();if(0<f.length&&f[0].me==a.me)break;if(0<f.length)return!1;if("DIV"==b.nodeName&&b.id==a.id)break;b=b.parentNode?b.parentNode:!1}a.cancelScroll();if((b=a.getTarget(c))&&/INPUT/i.test(b.nodeName)&&/range/i.test(b.type))return a.stopPropagation(c);!("clientX"in c)&&"changedTouches"in c&&(c.clientX=c.changedTouches[0].clientX,c.clientY=c.changedTouches[0].clientY);a.forcescreen&&(f=c,c={original:c.original?c.original:c},c.clientX=f.screenX,c.clientY=
f.screenY);a.rail.drag={x:c.clientX,y:c.clientY,sx:a.scroll.x,sy:a.scroll.y,st:a.getScrollTop(),sl:a.getScrollLeft(),pt:2,dl:!1};if(a.ispage||!a.opt.directionlockdeadzone)a.rail.drag.dl="f";else{var f=e(window).width(),n=e(window).height(),h=Math.max(document.body.scrollWidth,document.documentElement.scrollWidth),k=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight),n=Math.max(0,k-n),f=Math.max(0,h-f);a.rail.drag.ck=!a.rail.scrollable&&a.railh.scrollable?0<n?"v":!1:a.rail.scrollable&&
!a.railh.scrollable?0<f?"h":!1:!1;a.rail.drag.ck||(a.rail.drag.dl="f")}a.opt.touchbehavior&&(a.isiframe&&d.isie)&&(f=a.win.position(),a.rail.drag.x+=f.left,a.rail.drag.y+=f.top);a.hasmoving=!1;a.lastmouseup=!1;a.scrollmom.reset(c.clientX,c.clientY);if(!d.cantouch&&!this.istouchcapable&&!d.hasmstouch){if(!b||!/INPUT|SELECT|TEXTAREA/i.test(b.nodeName))return!a.ispage&&d.hasmousecapture&&b.setCapture(),a.opt.touchbehavior?(b.onclick&&!b._onclick&&(b._onclick=b.onclick,b.onclick=function(c){if(a.hasmoving)return!1;
b._onclick.call(this,c)}),a.cancelEvent(c)):a.stopPropagation(c);/SUBMIT|CANCEL|BUTTON/i.test(e(b).attr("type"))&&(pc={tg:b,click:!1},a.preventclick=pc)}}};a.ontouchend=function(c){if(c.pointerType&&2!=c.pointerType)return!1;if(a.rail.drag&&2==a.rail.drag.pt&&(a.scrollmom.doMomentum(),a.rail.drag=!1,a.hasmoving&&(a.lastmouseup=!0,a.hideCursor(),d.hasmousecapture&&document.releaseCapture(),!d.cantouch)))return a.cancelEvent(c)};var q=a.opt.touchbehavior&&a.isiframe&&!d.hasmousecapture;a.ontouchmove=
function(c,b){if(c.pointerType&&2!=c.pointerType)return!1;if(a.rail.drag&&2==a.rail.drag.pt){if(d.cantouch&&"undefined"==typeof c.original)return!0;a.hasmoving=!0;a.preventclick&&!a.preventclick.click&&(a.preventclick.click=a.preventclick.tg.onclick||!1,a.preventclick.tg.onclick=a.onpreventclick);c=e.extend({original:c},c);"changedTouches"in c&&(c.clientX=c.changedTouches[0].clientX,c.clientY=c.changedTouches[0].clientY);if(a.forcescreen){var f=c;c={original:c.original?c.original:c};c.clientX=f.screenX;
c.clientY=f.screenY}f=ofy=0;if(q&&!b){var n=a.win.position(),f=-n.left;ofy=-n.top}var h=c.clientY+ofy,n=h-a.rail.drag.y,k=c.clientX+f,u=k-a.rail.drag.x,g=a.rail.drag.st-n;a.ishwscroll&&a.opt.bouncescroll?0>g?g=Math.round(g/2):g>a.page.maxh&&(g=a.page.maxh+Math.round((g-a.page.maxh)/2)):(0>g&&(h=g=0),g>a.page.maxh&&(g=a.page.maxh,h=0));if(a.railh&&a.railh.scrollable){var l=a.rail.drag.sl-u;a.ishwscroll&&a.opt.bouncescroll?0>l?l=Math.round(l/2):l>a.page.maxw&&(l=a.page.maxw+Math.round((l-a.page.maxw)/
2)):(0>l&&(k=l=0),l>a.page.maxw&&(l=a.page.maxw,k=0))}f=!1;if(a.rail.drag.dl)f=!0,"v"==a.rail.drag.dl?l=a.rail.drag.sl:"h"==a.rail.drag.dl&&(g=a.rail.drag.st);else{var n=Math.abs(n),u=Math.abs(u),m=a.opt.directionlockdeadzone;if("v"==a.rail.drag.ck){if(n>m&&u<=0.3*n)return a.rail.drag=!1,!0;u>m&&(a.rail.drag.dl="f",e("body").scrollTop(e("body").scrollTop()))}else if("h"==a.rail.drag.ck){if(u>m&&n<=0.3*u)return a.rail.drag=!1,!0;n>m&&(a.rail.drag.dl="f",e("body").scrollLeft(e("body").scrollLeft()))}}a.synched("touchmove",
function(){a.rail.drag&&2==a.rail.drag.pt&&(a.prepareTransition&&a.prepareTransition(0),a.rail.scrollable&&a.setScrollTop(g),a.scrollmom.update(k,h),a.railh&&a.railh.scrollable?(a.setScrollLeft(l),a.showCursor(g,l)):a.showCursor(g),d.isie10&&document.selection.clear())});d.ischrome&&a.istouchcapable&&(f=!1);if(f)return a.cancelEvent(c)}}}a.onmousedown=function(c,b){if(!(a.rail.drag&&1!=a.rail.drag.pt)){if(a.locked)return a.cancelEvent(c);a.cancelScroll();a.rail.drag={x:c.clientX,y:c.clientY,sx:a.scroll.x,
sy:a.scroll.y,pt:1,hr:!!b};var f=a.getTarget(c);!a.ispage&&d.hasmousecapture&&f.setCapture();a.isiframe&&!d.hasmousecapture&&(a.saved.csspointerevents=a.doc.css("pointer-events"),a.css(a.doc,{"pointer-events":"none"}));a.hasmoving=!1;return a.cancelEvent(c)}};a.onmouseup=function(c){if(a.rail.drag&&(d.hasmousecapture&&document.releaseCapture(),a.isiframe&&!d.hasmousecapture&&a.doc.css("pointer-events",a.saved.csspointerevents),1==a.rail.drag.pt))return a.rail.drag=!1,a.hasmoving&&a.triggerScrollEnd(),
a.cancelEvent(c)};a.onmousemove=function(c){if(a.rail.drag&&1==a.rail.drag.pt){if(d.ischrome&&0==c.which)return a.onmouseup(c);a.cursorfreezed=!0;a.hasmoving=!0;if(a.rail.drag.hr){a.scroll.x=a.rail.drag.sx+(c.clientX-a.rail.drag.x);0>a.scroll.x&&(a.scroll.x=0);var b=a.scrollvaluemaxw;a.scroll.x>b&&(a.scroll.x=b)}else a.scroll.y=a.rail.drag.sy+(c.clientY-a.rail.drag.y),0>a.scroll.y&&(a.scroll.y=0),b=a.scrollvaluemax,a.scroll.y>b&&(a.scroll.y=b);a.synched("mousemove",function(){a.rail.drag&&1==a.rail.drag.pt&&
(a.showCursor(),a.rail.drag.hr?a.doScrollLeft(Math.round(a.scroll.x*a.scrollratio.x),a.opt.cursordragspeed):a.doScrollTop(Math.round(a.scroll.y*a.scrollratio.y),a.opt.cursordragspeed))});return a.cancelEvent(c)}};if(d.cantouch||a.opt.touchbehavior)a.onpreventclick=function(c){if(a.preventclick)return a.preventclick.tg.onclick=a.preventclick.click,a.preventclick=!1,a.cancelEvent(c)},a.bind(a.win,"mousedown",a.ontouchstart),a.onclick=d.isios?!1:function(c){return a.lastmouseup?(a.lastmouseup=!1,a.cancelEvent(c)):
!0},a.opt.grabcursorenabled&&d.cursorgrabvalue&&(a.css(a.ispage?a.doc:a.win,{cursor:d.cursorgrabvalue}),a.css(a.rail,{cursor:d.cursorgrabvalue}));else{var p=function(c){if(a.selectiondrag){if(c){var b=a.win.outerHeight();c=c.pageY-a.selectiondrag.top;0<c&&c<b&&(c=0);c>=b&&(c-=b);a.selectiondrag.df=c}0!=a.selectiondrag.df&&(a.doScrollBy(2*-Math.floor(a.selectiondrag.df/6)),a.debounced("doselectionscroll",function(){p()},50))}};a.hasTextSelected="getSelection"in document?function(){return 0<document.getSelection().rangeCount}:
"selection"in document?function(){return"None"!=document.selection.type}:function(){return!1};a.onselectionstart=function(c){a.ispage||(a.selectiondrag=a.win.offset())};a.onselectionend=function(c){a.selectiondrag=!1};a.onselectiondrag=function(c){a.selectiondrag&&a.hasTextSelected()&&a.debounced("selectionscroll",function(){p(c)},250)}}d.hasmstouch&&(a.css(a.rail,{"-ms-touch-action":"none"}),a.css(a.cursor,{"-ms-touch-action":"none"}),a.bind(a.win,"MSPointerDown",a.ontouchstart),a.bind(document,
"MSPointerUp",a.ontouchend),a.bind(document,"MSPointerMove",a.ontouchmove),a.bind(a.cursor,"MSGestureHold",function(a){a.preventDefault()}),a.bind(a.cursor,"contextmenu",function(a){a.preventDefault()}));this.istouchcapable&&(a.bind(a.win,"touchstart",a.ontouchstart),a.bind(document,"touchend",a.ontouchend),a.bind(document,"touchcancel",a.ontouchend),a.bind(document,"touchmove",a.ontouchmove));a.bind(a.cursor,"mousedown",a.onmousedown);a.bind(a.cursor,"mouseup",a.onmouseup);a.railh&&(a.bind(a.cursorh,
"mousedown",function(c){a.onmousedown(c,!0)}),a.bind(a.cursorh,"mouseup",a.onmouseup));if(a.opt.cursordragontouch||!d.cantouch&&!a.opt.touchbehavior)a.rail.css({cursor:"default"}),a.railh&&a.railh.css({cursor:"default"}),a.jqbind(a.rail,"mouseenter",function(){if(!a.win.is(":visible"))return!1;a.canshowonmouseevent&&a.showCursor();a.rail.active=!0}),a.jqbind(a.rail,"mouseleave",function(){a.rail.active=!1;a.rail.drag||a.hideCursor()}),a.opt.sensitiverail&&(a.bind(a.rail,"click",function(c){a.doRailClick(c,
!1,!1)}),a.bind(a.rail,"dblclick",function(c){a.doRailClick(c,!0,!1)}),a.bind(a.cursor,"click",function(c){a.cancelEvent(c)}),a.bind(a.cursor,"dblclick",function(c){a.cancelEvent(c)})),a.railh&&(a.jqbind(a.railh,"mouseenter",function(){if(!a.win.is(":visible"))return!1;a.canshowonmouseevent&&a.showCursor();a.rail.active=!0}),a.jqbind(a.railh,"mouseleave",function(){a.rail.active=!1;a.rail.drag||a.hideCursor()}),a.opt.sensitiverail&&(a.bind(a.railh,"click",function(c){a.doRailClick(c,!1,!0)}),a.bind(a.railh,
"dblclick",function(c){a.doRailClick(c,!0,!0)}),a.bind(a.cursorh,"click",function(c){a.cancelEvent(c)}),a.bind(a.cursorh,"dblclick",function(c){a.cancelEvent(c)})));!d.cantouch&&!a.opt.touchbehavior?(a.bind(d.hasmousecapture?a.win:document,"mouseup",a.onmouseup),a.bind(document,"mousemove",a.onmousemove),a.onclick&&a.bind(document,"click",a.onclick),!a.ispage&&a.opt.enablescrollonselection&&(a.bind(a.win[0],"mousedown",a.onselectionstart),a.bind(document,"mouseup",a.onselectionend),a.bind(a.cursor,
"mouseup",a.onselectionend),a.cursorh&&a.bind(a.cursorh,"mouseup",a.onselectionend),a.bind(document,"mousemove",a.onselectiondrag)),a.zoom&&(a.jqbind(a.zoom,"mouseenter",function(){a.canshowonmouseevent&&a.showCursor();a.rail.active=!0}),a.jqbind(a.zoom,"mouseleave",function(){a.rail.active=!1;a.rail.drag||a.hideCursor()}))):(a.bind(d.hasmousecapture?a.win:document,"mouseup",a.ontouchend),a.bind(document,"mousemove",a.ontouchmove),a.onclick&&a.bind(document,"click",a.onclick),a.opt.cursordragontouch&&
(a.bind(a.cursor,"mousedown",a.onmousedown),a.bind(a.cursor,"mousemove",a.onmousemove),a.cursorh&&a.bind(a.cursorh,"mousedown",function(c){a.onmousedown(c,!0)}),a.cursorh&&a.bind(a.cursorh,"mousemove",a.onmousemove)));a.opt.enablemousewheel&&(a.isiframe||a.bind(d.isie&&a.ispage?document:a.win,"mousewheel",a.onmousewheel),a.bind(a.rail,"mousewheel",a.onmousewheel),a.railh&&a.bind(a.railh,"mousewheel",a.onmousewheelhr));!a.ispage&&(!d.cantouch&&!/HTML|^BODY/.test(a.win[0].nodeName))&&(a.win.attr("tabindex")||
a.win.attr({tabindex:J++}),a.jqbind(a.win,"focus",function(c){y=a.getTarget(c).id||!0;a.hasfocus=!0;a.canshowonmouseevent&&a.noticeCursor()}),a.jqbind(a.win,"blur",function(c){y=!1;a.hasfocus=!1}),a.jqbind(a.win,"mouseenter",function(c){C=a.getTarget(c).id||!0;a.hasmousefocus=!0;a.canshowonmouseevent&&a.noticeCursor()}),a.jqbind(a.win,"mouseleave",function(){C=!1;a.hasmousefocus=!1;a.rail.drag||a.hideCursor()}))}a.onkeypress=function(c){if(a.locked&&0==a.page.maxh)return!0;c=c?c:window.e;var b=a.getTarget(c);
if(b&&/INPUT|TEXTAREA|SELECT|OPTION/.test(b.nodeName)&&(!b.getAttribute("type")&&!b.type||!/submit|button|cancel/i.tp)||e(b).attr("contenteditable"))return!0;if(a.hasfocus||a.hasmousefocus&&!y||a.ispage&&!y&&!C){b=c.keyCode;if(a.locked&&27!=b)return a.cancelEvent(c);var f=c.ctrlKey||!1,n=c.shiftKey||!1,d=!1;switch(b){case 38:case 63233:a.doScrollBy(72);d=!0;break;case 40:case 63235:a.doScrollBy(-72);d=!0;break;case 37:case 63232:a.railh&&(f?a.doScrollLeft(0):a.doScrollLeftBy(72),d=!0);break;case 39:case 63234:a.railh&&
(f?a.doScrollLeft(a.page.maxw):a.doScrollLeftBy(-72),d=!0);break;case 33:case 63276:a.doScrollBy(a.view.h);d=!0;break;case 34:case 63277:a.doScrollBy(-a.view.h);d=!0;break;case 36:case 63273:a.railh&&f?a.doScrollPos(0,0):a.doScrollTo(0);d=!0;break;case 35:case 63275:a.railh&&f?a.doScrollPos(a.page.maxw,a.page.maxh):a.doScrollTo(a.page.maxh);d=!0;break;case 32:a.opt.spacebarenabled&&(n?a.doScrollBy(a.view.h):a.doScrollBy(-a.view.h),d=!0);break;case 27:a.zoomactive&&(a.doZoom(),d=!0)}if(d)return a.cancelEvent(c)}};
a.opt.enablekeyboard&&a.bind(document,d.isopera&&!d.isopera12?"keypress":"keydown",a.onkeypress);a.bind(document,"keydown",function(c){c.ctrlKey&&(a.wheelprevented=!0)});a.bind(document,"keyup",function(c){c.ctrlKey||(a.wheelprevented=!1)});a.bind(window,"resize",a.lazyResize);a.bind(window,"orientationchange",a.lazyResize);a.bind(window,"load",a.lazyResize);if(d.ischrome&&!a.ispage&&!a.haswrapper){var r=a.win.attr("style"),f=parseFloat(a.win.css("width"))+1;a.win.css("width",f);a.synched("chromefix",
function(){a.win.attr("style",r)})}a.onAttributeChange=function(c){a.lazyResize(250)};!a.ispage&&!a.haswrapper&&(!1!==z?(a.observer=new z(function(c){c.forEach(a.onAttributeChange)}),a.observer.observe(a.win[0],{childList:!0,characterData:!1,attributes:!0,subtree:!1}),a.observerremover=new z(function(c){c.forEach(function(c){if(0<c.removedNodes.length)for(var b in c.removedNodes)if(c.removedNodes[b]==a.win[0])return a.remove()})}),a.observerremover.observe(a.win[0].parentNode,{childList:!0,characterData:!1,
attributes:!1,subtree:!1})):(a.bind(a.win,d.isie&&!d.isie9?"propertychange":"DOMAttrModified",a.onAttributeChange),d.isie9&&a.win[0].attachEvent("onpropertychange",a.onAttributeChange),a.bind(a.win,"DOMNodeRemoved",function(c){c.target==a.win[0]&&a.remove()})));!a.ispage&&a.opt.boxzoom&&a.bind(window,"resize",a.resizeZoom);a.istextarea&&a.bind(a.win,"mouseup",a.lazyResize);a.lazyResize(30)}if("IFRAME"==this.doc[0].nodeName){var I=function(c){a.iframexd=!1;try{var b="contentDocument"in this?this.contentDocument:
this.contentWindow.document}catch(f){a.iframexd=!0,b=!1}if(a.iframexd)return"console"in window&&console.log("NiceScroll error: policy restriced iframe"),!0;a.forcescreen=!0;a.isiframe&&(a.iframe={doc:e(b),html:a.doc.contents().find("html")[0],body:a.doc.contents().find("body")[0]},a.getContentSize=function(){return{w:Math.max(a.iframe.html.scrollWidth,a.iframe.body.scrollWidth),h:Math.max(a.iframe.html.scrollHeight,a.iframe.body.scrollHeight)}},a.docscroll=e(a.iframe.body));!d.isios&&(a.opt.iframeautoresize&&
!a.isiframe)&&(a.win.scrollTop(0),a.doc.height(""),c=Math.max(b.getElementsByTagName("html")[0].scrollHeight,b.body.scrollHeight),a.doc.height(c));a.lazyResize(30);d.isie7&&a.css(e(a.iframe.html),{"overflow-y":"hidden"});a.css(e(a.iframe.body),{"overflow-y":"hidden"});d.isios&&a.haswrapper&&a.css(e(b.body),{"-webkit-transform":"translate3d(0,0,0)"});"contentWindow"in this?a.bind(this.contentWindow,"scroll",a.onscroll):a.bind(b,"scroll",a.onscroll);a.opt.enablemousewheel&&a.bind(b,"mousewheel",a.onmousewheel);
a.opt.enablekeyboard&&a.bind(b,d.isopera?"keypress":"keydown",a.onkeypress);if(d.cantouch||a.opt.touchbehavior)a.bind(b,"mousedown",a.ontouchstart),a.bind(b,"mousemove",function(c){a.ontouchmove(c,!0)}),a.opt.grabcursorenabled&&d.cursorgrabvalue&&a.css(e(b.body),{cursor:d.cursorgrabvalue});a.bind(b,"mouseup",a.ontouchend);a.zoom&&(a.opt.dblclickzoom&&a.bind(b,"dblclick",a.doZoom),a.ongesturezoom&&a.bind(b,"gestureend",a.ongesturezoom))};this.doc[0].readyState&&"complete"==this.doc[0].readyState&&
setTimeout(function(){I.call(a.doc[0],!1)},500);a.bind(this.doc,"load",I)}};this.showCursor=function(c,b){a.cursortimeout&&(clearTimeout(a.cursortimeout),a.cursortimeout=0);if(a.rail){a.autohidedom&&(a.autohidedom.stop().css({opacity:a.opt.cursoropacitymax}),a.cursoractive=!0);if(!a.rail.drag||1!=a.rail.drag.pt)"undefined"!=typeof c&&!1!==c&&(a.scroll.y=Math.round(1*c/a.scrollratio.y)),"undefined"!=typeof b&&(a.scroll.x=Math.round(1*b/a.scrollratio.x));a.cursor.css({height:a.cursorheight,top:a.scroll.y});
a.cursorh&&(!a.rail.align&&a.rail.visibility?a.cursorh.css({width:a.cursorwidth,left:a.scroll.x+a.rail.width}):a.cursorh.css({width:a.cursorwidth,left:a.scroll.x}),a.cursoractive=!0);a.zoom&&a.zoom.stop().css({opacity:a.opt.cursoropacitymax})}};this.hideCursor=function(c){!a.cursortimeout&&(a.rail&&a.autohidedom&&!(a.hasmousefocus&&"leave"==a.opt.autohidemode))&&(a.cursortimeout=setTimeout(function(){if(!a.rail.active||!a.showonmouseevent)a.autohidedom.stop().animate({opacity:a.opt.cursoropacitymin}),
a.zoom&&a.zoom.stop().animate({opacity:a.opt.cursoropacitymin}),a.cursoractive=!1;a.cursortimeout=0},c||a.opt.hidecursordelay))};this.noticeCursor=function(c,b,f){a.showCursor(b,f);a.rail.active||a.hideCursor(c)};this.getContentSize=a.ispage?function(){return{w:Math.max(document.body.scrollWidth,document.documentElement.scrollWidth),h:Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)}}:a.haswrapper?function(){return{w:a.doc.outerWidth()+parseInt(a.win.css("paddingLeft"))+
parseInt(a.win.css("paddingRight")),h:a.doc.outerHeight()+parseInt(a.win.css("paddingTop"))+parseInt(a.win.css("paddingBottom"))}}:function(){return{w:a.docscroll[0].scrollWidth,h:a.docscroll[0].scrollHeight}};this.onResize=function(c,b){if(!a||!a.win)return!1;if(!a.haswrapper&&!a.ispage){if("none"==a.win.css("display"))return a.visibility&&a.hideRail().hideRailHr(),!1;!a.hidden&&!a.visibility&&a.showRail().showRailHr()}var f=a.page.maxh,d=a.page.maxw,e=a.view.w;a.view={w:a.ispage?a.win.width():parseInt(a.win[0].clientWidth),
h:a.ispage?a.win.height():parseInt(a.win[0].clientHeight)};a.page=b?b:a.getContentSize();a.page.maxh=Math.max(0,a.page.h-a.view.h);a.page.maxw=Math.max(0,a.page.w-a.view.w);if(a.page.maxh==f&&a.page.maxw==d&&a.view.w==e){if(a.ispage)return a;f=a.win.offset();if(a.lastposition&&(d=a.lastposition,d.top==f.top&&d.left==f.left))return a;a.lastposition=f}0==a.page.maxh?(a.hideRail(),a.scrollvaluemax=0,a.scroll.y=0,a.scrollratio.y=0,a.cursorheight=0,a.setScrollTop(0),a.rail.scrollable=!1):a.rail.scrollable=
!0;0==a.page.maxw?(a.hideRailHr(),a.scrollvaluemaxw=0,a.scroll.x=0,a.scrollratio.x=0,a.cursorwidth=0,a.setScrollLeft(0),a.railh.scrollable=!1):a.railh.scrollable=!0;a.locked=0==a.page.maxh&&0==a.page.maxw;if(a.locked)return a.ispage||a.updateScrollBar(a.view),!1;!a.hidden&&!a.visibility?a.showRail().showRailHr():!a.hidden&&!a.railh.visibility&&a.showRailHr();a.istextarea&&(a.win.css("resize")&&"none"!=a.win.css("resize"))&&(a.view.h-=20);a.cursorheight=Math.min(a.view.h,Math.round(a.view.h*(a.view.h/
a.page.h)));a.cursorheight=a.opt.cursorfixedheight?a.opt.cursorfixedheight:Math.max(a.opt.cursorminheight,a.cursorheight);a.cursorwidth=Math.min(a.view.w,Math.round(a.view.w*(a.view.w/a.page.w)));a.cursorwidth=a.opt.cursorfixedheight?a.opt.cursorfixedheight:Math.max(a.opt.cursorminheight,a.cursorwidth);a.scrollvaluemax=a.view.h-a.cursorheight-a.cursor.hborder;a.railh&&(a.railh.width=0<a.page.maxh?a.view.w-a.rail.width:a.view.w,a.scrollvaluemaxw=a.railh.width-a.cursorwidth-a.cursorh.wborder);a.ispage||
a.updateScrollBar(a.view);a.scrollratio={x:a.page.maxw/a.scrollvaluemaxw,y:a.page.maxh/a.scrollvaluemax};a.getScrollTop()>a.page.maxh?a.doScrollTop(a.page.maxh):(a.scroll.y=Math.round(a.getScrollTop()*(1/a.scrollratio.y)),a.scroll.x=Math.round(a.getScrollLeft()*(1/a.scrollratio.x)),a.cursoractive&&a.noticeCursor());a.scroll.y&&0==a.getScrollTop()&&a.doScrollTo(Math.floor(a.scroll.y*a.scrollratio.y));return a};this.resize=a.onResize;this.lazyResize=function(c){c=isNaN(c)?30:c;a.delayed("resize",a.resize,
c);return a};this._bind=function(c,b,f,d){a.events.push({e:c,n:b,f:f,b:d,q:!1});c.addEventListener?c.addEventListener(b,f,d||!1):c.attachEvent?c.attachEvent("on"+b,f):c["on"+b]=f};this.jqbind=function(c,b,f){a.events.push({e:c,n:b,f:f,q:!0});e(c).bind(b,f)};this.bind=function(c,b,f,e){var h="jquery"in c?c[0]:c;"mousewheel"==b?"onwheel"in a.win?a._bind(h,"wheel",f,e||!1):(c="undefined"!=typeof document.onmousewheel?"mousewheel":"DOMMouseScroll",l(h,c,f,e||!1),"DOMMouseScroll"==c&&l(h,"MozMousePixelScroll",
f,e||!1)):h.addEventListener?(d.cantouch&&/mouseup|mousedown|mousemove/.test(b)&&a._bind(h,"mousedown"==b?"touchstart":"mouseup"==b?"touchend":"touchmove",function(a){if(a.touches){if(2>a.touches.length){var c=a.touches.length?a.touches[0]:a;c.original=a;f.call(this,c)}}else a.changedTouches&&(c=a.changedTouches[0],c.original=a,f.call(this,c))},e||!1),a._bind(h,b,f,e||!1),d.cantouch&&"mouseup"==b&&a._bind(h,"touchcancel",f,e||!1)):a._bind(h,b,function(c){if((c=c||window.event||!1)&&c.srcElement)c.target=
c.srcElement;"pageY"in c||(c.pageX=c.clientX+document.documentElement.scrollLeft,c.pageY=c.clientY+document.documentElement.scrollTop);return!1===f.call(h,c)||!1===e?a.cancelEvent(c):!0})};this._unbind=function(a,b,f,d){a.removeEventListener?a.removeEventListener(b,f,d):a.detachEvent?a.detachEvent("on"+b,f):a["on"+b]=!1};this.unbindAll=function(){for(var c=0;c<a.events.length;c++){var b=a.events[c];b.q?b.e.unbind(b.n,b.f):a._unbind(b.e,b.n,b.f,b.b)}};this.cancelEvent=function(a){a=a.original?a.original:
a?a:window.event||!1;if(!a)return!1;a.preventDefault&&a.preventDefault();a.stopPropagation&&a.stopPropagation();a.preventManipulation&&a.preventManipulation();a.cancelBubble=!0;a.cancel=!0;return a.returnValue=!1};this.stopPropagation=function(a){a=a.original?a.original:a?a:window.event||!1;if(!a)return!1;if(a.stopPropagation)return a.stopPropagation();a.cancelBubble&&(a.cancelBubble=!0);return!1};this.showRail=function(){if(0!=a.page.maxh&&(a.ispage||"none"!=a.win.css("display")))a.visibility=!0,
a.rail.visibility=!0,a.rail.css("display","block");return a};this.showRailHr=function(){if(!a.railh)return a;if(0!=a.page.maxw&&(a.ispage||"none"!=a.win.css("display")))a.railh.visibility=!0,a.railh.css("display","block");return a};this.hideRail=function(){a.visibility=!1;a.rail.visibility=!1;a.rail.css("display","none");return a};this.hideRailHr=function(){if(!a.railh)return a;a.railh.visibility=!1;a.railh.css("display","none");return a};this.show=function(){a.hidden=!1;a.locked=!1;return a.showRail().showRailHr()};
this.hide=function(){a.hidden=!0;a.locked=!0;return a.hideRail().hideRailHr()};this.toggle=function(){return a.hidden?a.show():a.hide()};this.remove=function(){a.stop();a.cursortimeout&&clearTimeout(a.cursortimeout);a.doZoomOut();a.unbindAll();d.isie9&&a.win[0].detachEvent("onpropertychange",a.onAttributeChange);!1!==a.observer&&a.observer.disconnect();!1!==a.observerremover&&a.observerremover.disconnect();a.events=null;a.cursor&&a.cursor.remove();a.cursorh&&a.cursorh.remove();a.rail&&a.rail.remove();
a.railh&&a.railh.remove();a.zoom&&a.zoom.remove();for(var c=0;c<a.saved.css.length;c++){var b=a.saved.css[c];b[0].css(b[1],"undefined"==typeof b[2]?"":b[2])}a.saved=!1;a.me.data("__nicescroll","");var f=e.nicescroll;f.each(function(c){if(this&&this.id===a.id){delete f[c];for(var b=++c;b<f.length;b++,c++)f[c]=f[b];f.length--;f.length&&delete f[f.length]}});for(var h in a)a[h]=null,delete a[h];a=null};this.scrollstart=function(c){this.onscrollstart=c;return a};this.scrollend=function(c){this.onscrollend=
c;return a};this.scrollcancel=function(c){this.onscrollcancel=c;return a};this.zoomin=function(c){this.onzoomin=c;return a};this.zoomout=function(c){this.onzoomout=c;return a};this.isScrollable=function(a){a=a.target?a.target:a;if("OPTION"==a.nodeName)return!0;for(;a&&1==a.nodeType&&!/^BODY|HTML/.test(a.nodeName);){var b=e(a),b=b.css("overflowY")||b.css("overflowX")||b.css("overflow")||"";if(/scroll|auto/.test(b))return a.clientHeight!=a.scrollHeight;a=a.parentNode?a.parentNode:!1}return!1};this.getViewport=
function(a){for(a=a&&a.parentNode?a.parentNode:!1;a&&1==a.nodeType&&!/^BODY|HTML/.test(a.nodeName);){var b=e(a);if(/fixed|absolute/.test(b.css("position")))return b;var f=b.css("overflowY")||b.css("overflowX")||b.css("overflow")||"";if(/scroll|auto/.test(f)&&a.clientHeight!=a.scrollHeight||0<b.getNiceScroll().length)return b;a=a.parentNode?a.parentNode:!1}return a?e(a):!1};this.triggerScrollEnd=function(){if(a.onscrollend){var c=a.getScrollLeft(),b=a.getScrollTop();a.onscrollend.call(a,{type:"scrollend",
current:{x:c,y:b},end:{x:c,y:b}})}};this.onmousewheel=function(c){if(!a.wheelprevented){if(a.locked)return a.debounced("checkunlock",a.resize,250),!0;if(a.rail.drag)return a.cancelEvent(c);"auto"==a.opt.oneaxismousemode&&0!=c.deltaX&&(a.opt.oneaxismousemode=!1);if(a.opt.oneaxismousemode&&0==c.deltaX&&!a.rail.scrollable)return a.railh&&a.railh.scrollable?a.onmousewheelhr(c):!0;var b=+new Date,f=!1;a.opt.preservenativescrolling&&a.checkarea+600<b&&(a.nativescrollingarea=a.isScrollable(c),f=!0);a.checkarea=
b;if(a.nativescrollingarea)return!0;if(c=q(c,!1,f))a.checkarea=0;return c}};this.onmousewheelhr=function(c){if(!a.wheelprevented){if(a.locked||!a.railh.scrollable)return!0;if(a.rail.drag)return a.cancelEvent(c);var b=+new Date,f=!1;a.opt.preservenativescrolling&&a.checkarea+600<b&&(a.nativescrollingarea=a.isScrollable(c),f=!0);a.checkarea=b;return a.nativescrollingarea?!0:a.locked?a.cancelEvent(c):q(c,!0,f)}};this.stop=function(){a.cancelScroll();a.scrollmon&&a.scrollmon.stop();a.cursorfreezed=!1;
a.scroll.y=Math.round(a.getScrollTop()*(1/a.scrollratio.y));a.noticeCursor();return a};this.getTransitionSpeed=function(b){var d=Math.round(10*a.opt.scrollspeed);b=Math.min(d,Math.round(b/20*a.opt.scrollspeed));return 20<b?b:0};a.opt.smoothscroll?a.ishwscroll&&d.hastransition&&a.opt.usetransition?(this.prepareTransition=function(b,e){var f=e?20<b?b:0:a.getTransitionSpeed(b),h=f?d.prefixstyle+"transform "+f+"ms ease-out":"";if(!a.lasttransitionstyle||a.lasttransitionstyle!=h)a.lasttransitionstyle=
h,a.doc.css(d.transitionstyle,h);return f},this.doScrollLeft=function(b,d){var f=a.scrollrunning?a.newscrolly:a.getScrollTop();a.doScrollPos(b,f,d)},this.doScrollTop=function(b,d){var f=a.scrollrunning?a.newscrollx:a.getScrollLeft();a.doScrollPos(f,b,d)},this.doScrollPos=function(b,e,f){var h=a.getScrollTop(),g=a.getScrollLeft();(0>(a.newscrolly-h)*(e-h)||0>(a.newscrollx-g)*(b-g))&&a.cancelScroll();!1==a.opt.bouncescroll&&(0>e?e=0:e>a.page.maxh&&(e=a.page.maxh),0>b?b=0:b>a.page.maxw&&(b=a.page.maxw));
if(a.scrollrunning&&b==a.newscrollx&&e==a.newscrolly)return!1;a.newscrolly=e;a.newscrollx=b;a.newscrollspeed=f||!1;if(a.timer)return!1;a.timer=setTimeout(function(){var f=a.getScrollTop(),h=a.getScrollLeft(),g,k;g=b-h;k=e-f;g=Math.round(Math.sqrt(Math.pow(g,2)+Math.pow(k,2)));g=a.newscrollspeed&&1<a.newscrollspeed?a.newscrollspeed:a.getTransitionSpeed(g);a.newscrollspeed&&1>=a.newscrollspeed&&(g*=a.newscrollspeed);a.prepareTransition(g,!0);a.timerscroll&&a.timerscroll.tm&&clearInterval(a.timerscroll.tm);
0<g&&(!a.scrollrunning&&a.onscrollstart&&a.onscrollstart.call(a,{type:"scrollstart",current:{x:h,y:f},request:{x:b,y:e},end:{x:a.newscrollx,y:a.newscrolly},speed:g}),d.transitionend?a.scrollendtrapped||(a.scrollendtrapped=!0,a.bind(a.doc,d.transitionend,a.onScrollTransitionEnd,!1)):(a.scrollendtrapped&&clearTimeout(a.scrollendtrapped),a.scrollendtrapped=setTimeout(a.onScrollTransitionEnd,g)),a.timerscroll={bz:new BezierClass(f,a.newscrolly,g,0,0,0.58,1),bh:new BezierClass(h,a.newscrollx,g,0,0,0.58,
1)},a.cursorfreezed||(a.timerscroll.tm=setInterval(function(){a.showCursor(a.getScrollTop(),a.getScrollLeft())},60)));a.synched("doScroll-set",function(){a.timer=0;a.scrollendtrapped&&(a.scrollrunning=!0);a.setScrollTop(a.newscrolly);a.setScrollLeft(a.newscrollx);if(!a.scrollendtrapped)a.onScrollTransitionEnd()})},50)},this.cancelScroll=function(){if(!a.scrollendtrapped)return!0;var b=a.getScrollTop(),e=a.getScrollLeft();a.scrollrunning=!1;d.transitionend||clearTimeout(d.transitionend);a.scrollendtrapped=
!1;a._unbind(a.doc,d.transitionend,a.onScrollTransitionEnd);a.prepareTransition(0);a.setScrollTop(b);a.railh&&a.setScrollLeft(e);a.timerscroll&&a.timerscroll.tm&&clearInterval(a.timerscroll.tm);a.timerscroll=!1;a.cursorfreezed=!1;a.showCursor(b,e);return a},this.onScrollTransitionEnd=function(){a.scrollendtrapped&&a._unbind(a.doc,d.transitionend,a.onScrollTransitionEnd);a.scrollendtrapped=!1;a.prepareTransition(0);a.timerscroll&&a.timerscroll.tm&&clearInterval(a.timerscroll.tm);a.timerscroll=!1;var b=
a.getScrollTop(),e=a.getScrollLeft();a.setScrollTop(b);a.railh&&a.setScrollLeft(e);a.noticeCursor(!1,b,e);a.cursorfreezed=!1;0>b?b=0:b>a.page.maxh&&(b=a.page.maxh);0>e?e=0:e>a.page.maxw&&(e=a.page.maxw);if(b!=a.newscrolly||e!=a.newscrollx)return a.doScrollPos(e,b,a.opt.snapbackspeed);a.onscrollend&&a.scrollrunning&&a.triggerScrollEnd();a.scrollrunning=!1}):(this.doScrollLeft=function(b,d){var f=a.scrollrunning?a.newscrolly:a.getScrollTop();a.doScrollPos(b,f,d)},this.doScrollTop=function(b,d){var f=
a.scrollrunning?a.newscrollx:a.getScrollLeft();a.doScrollPos(f,b,d)},this.doScrollPos=function(b,d,f){function e(){if(a.cancelAnimationFrame)return!0;a.scrollrunning=!0;if(p=1-p)return a.timer=s(e)||1;var b=0,c=sy=a.getScrollTop();if(a.dst.ay){var c=a.bzscroll?a.dst.py+a.bzscroll.getNow()*a.dst.ay:a.newscrolly,f=c-sy;if(0>f&&c<a.newscrolly||0<f&&c>a.newscrolly)c=a.newscrolly;a.setScrollTop(c);c==a.newscrolly&&(b=1)}else b=1;var d=sx=a.getScrollLeft();if(a.dst.ax){d=a.bzscroll?a.dst.px+a.bzscroll.getNow()*
a.dst.ax:a.newscrollx;f=d-sx;if(0>f&&d<a.newscrollx||0<f&&d>a.newscrollx)d=a.newscrollx;a.setScrollLeft(d);d==a.newscrollx&&(b+=1)}else b+=1;2==b?(a.timer=0,a.cursorfreezed=!1,a.bzscroll=!1,a.scrollrunning=!1,0>c?c=0:c>a.page.maxh&&(c=a.page.maxh),0>d?d=0:d>a.page.maxw&&(d=a.page.maxw),d!=a.newscrollx||c!=a.newscrolly?a.doScrollPos(d,c):a.onscrollend&&a.triggerScrollEnd()):a.timer=s(e)||1}d="undefined"==typeof d||!1===d?a.getScrollTop(!0):d;if(a.timer&&a.newscrolly==d&&a.newscrollx==b)return!0;a.timer&&
v(a.timer);a.timer=0;var h=a.getScrollTop(),g=a.getScrollLeft();(0>(a.newscrolly-h)*(d-h)||0>(a.newscrollx-g)*(b-g))&&a.cancelScroll();a.newscrolly=d;a.newscrollx=b;if(!a.bouncescroll||!a.rail.visibility)0>a.newscrolly?a.newscrolly=0:a.newscrolly>a.page.maxh&&(a.newscrolly=a.page.maxh);if(!a.bouncescroll||!a.railh.visibility)0>a.newscrollx?a.newscrollx=0:a.newscrollx>a.page.maxw&&(a.newscrollx=a.page.maxw);a.dst={};a.dst.x=b-g;a.dst.y=d-h;a.dst.px=g;a.dst.py=h;var k=Math.round(Math.sqrt(Math.pow(a.dst.x,
2)+Math.pow(a.dst.y,2)));a.dst.ax=a.dst.x/k;a.dst.ay=a.dst.y/k;var l=0,q=k;0==a.dst.x?(l=h,q=d,a.dst.ay=1,a.dst.py=0):0==a.dst.y&&(l=g,q=b,a.dst.ax=1,a.dst.px=0);k=a.getTransitionSpeed(k);f&&1>=f&&(k*=f);a.bzscroll=0<k?a.bzscroll?a.bzscroll.update(q,k):new BezierClass(l,q,k,0,1,0,1):!1;if(!a.timer){(h==a.page.maxh&&d>=a.page.maxh||g==a.page.maxw&&b>=a.page.maxw)&&a.checkContentSize();var p=1;a.cancelAnimationFrame=!1;a.timer=1;a.onscrollstart&&!a.scrollrunning&&a.onscrollstart.call(a,{type:"scrollstart",
current:{x:g,y:h},request:{x:b,y:d},end:{x:a.newscrollx,y:a.newscrolly},speed:k});e();(h==a.page.maxh&&d>=h||g==a.page.maxw&&b>=g)&&a.checkContentSize();a.noticeCursor()}},this.cancelScroll=function(){a.timer&&v(a.timer);a.timer=0;a.bzscroll=!1;a.scrollrunning=!1;return a}):(this.doScrollLeft=function(b,d){var f=a.getScrollTop();a.doScrollPos(b,f,d)},this.doScrollTop=function(b,d){var f=a.getScrollLeft();a.doScrollPos(f,b,d)},this.doScrollPos=function(b,d,f){var e=b>a.page.maxw?a.page.maxw:b;0>e&&
(e=0);var h=d>a.page.maxh?a.page.maxh:d;0>h&&(h=0);a.synched("scroll",function(){a.setScrollTop(h);a.setScrollLeft(e)})},this.cancelScroll=function(){});this.doScrollBy=function(b,d){var f=0,f=d?Math.floor((a.scroll.y-b)*a.scrollratio.y):(a.timer?a.newscrolly:a.getScrollTop(!0))-b;if(a.bouncescroll){var e=Math.round(a.view.h/2);f<-e?f=-e:f>a.page.maxh+e&&(f=a.page.maxh+e)}a.cursorfreezed=!1;py=a.getScrollTop(!0);if(0>f&&0>=py)return a.noticeCursor();if(f>a.page.maxh&&py>=a.page.maxh)return a.checkContentSize(),
a.noticeCursor();a.doScrollTop(f)};this.doScrollLeftBy=function(b,d){var f=0,f=d?Math.floor((a.scroll.x-b)*a.scrollratio.x):(a.timer?a.newscrollx:a.getScrollLeft(!0))-b;if(a.bouncescroll){var e=Math.round(a.view.w/2);f<-e?f=-e:f>a.page.maxw+e&&(f=a.page.maxw+e)}a.cursorfreezed=!1;px=a.getScrollLeft(!0);if(0>f&&0>=px||f>a.page.maxw&&px>=a.page.maxw)return a.noticeCursor();a.doScrollLeft(f)};this.doScrollTo=function(b,d){d&&Math.round(b*a.scrollratio.y);a.cursorfreezed=!1;a.doScrollTop(b)};this.checkContentSize=
function(){var b=a.getContentSize();(b.h!=a.page.h||b.w!=a.page.w)&&a.resize(!1,b)};a.onscroll=function(b){a.rail.drag||a.cursorfreezed||a.synched("scroll",function(){a.scroll.y=Math.round(a.getScrollTop()*(1/a.scrollratio.y));a.railh&&(a.scroll.x=Math.round(a.getScrollLeft()*(1/a.scrollratio.x)));a.noticeCursor()})};a.bind(a.docscroll,"scroll",a.onscroll);this.doZoomIn=function(b){if(!a.zoomactive){a.zoomactive=!0;a.zoomrestore={style:{}};var h="position top left zIndex backgroundColor marginTop marginBottom marginLeft marginRight".split(" "),
f=a.win[0].style,g;for(g in h){var k=h[g];a.zoomrestore.style[k]="undefined"!=typeof f[k]?f[k]:""}a.zoomrestore.style.width=a.win.css("width");a.zoomrestore.style.height=a.win.css("height");a.zoomrestore.padding={w:a.win.outerWidth()-a.win.width(),h:a.win.outerHeight()-a.win.height()};d.isios4&&(a.zoomrestore.scrollTop=e(window).scrollTop(),e(window).scrollTop(0));a.win.css({position:d.isios4?"absolute":"fixed",top:0,left:0,"z-index":x+100,margin:"0px"});h=a.win.css("backgroundColor");(""==h||/transparent|rgba\(0, 0, 0, 0\)|rgba\(0,0,0,0\)/.test(h))&&
a.win.css("backgroundColor","#fff");a.rail.css({"z-index":x+101});a.zoom.css({"z-index":x+102});a.zoom.css("backgroundPosition","0px -18px");a.resizeZoom();a.onzoomin&&a.onzoomin.call(a);return a.cancelEvent(b)}};this.doZoomOut=function(b){if(a.zoomactive)return a.zoomactive=!1,a.win.css("margin",""),a.win.css(a.zoomrestore.style),d.isios4&&e(window).scrollTop(a.zoomrestore.scrollTop),a.rail.css({"z-index":a.zindex}),a.zoom.css({"z-index":a.zindex}),a.zoomrestore=!1,a.zoom.css("backgroundPosition",
"0px 0px"),a.onResize(),a.onzoomout&&a.onzoomout.call(a),a.cancelEvent(b)};this.doZoom=function(b){return a.zoomactive?a.doZoomOut(b):a.doZoomIn(b)};this.resizeZoom=function(){if(a.zoomactive){var b=a.getScrollTop();a.win.css({width:e(window).width()-a.zoomrestore.padding.w+"px",height:e(window).height()-a.zoomrestore.padding.h+"px"});a.onResize();a.setScrollTop(Math.min(a.page.maxh,b))}};this.init();e.nicescroll.push(this)},H=function(e){var b=this;this.nc=e;this.steptime=this.lasttime=this.speedy=
this.speedx=this.lasty=this.lastx=0;this.snapy=this.snapx=!1;this.demuly=this.demulx=0;this.lastscrolly=this.lastscrollx=-1;this.timer=this.chky=this.chkx=0;this.time=function(){return+new Date};this.reset=function(e,g){b.stop();var l=b.time();b.steptime=0;b.lasttime=l;b.speedx=0;b.speedy=0;b.lastx=e;b.lasty=g;b.lastscrollx=-1;b.lastscrolly=-1};this.update=function(e,g){var l=b.time();b.steptime=l-b.lasttime;b.lasttime=l;var l=g-b.lasty,q=e-b.lastx,a=b.nc.getScrollTop(),p=b.nc.getScrollLeft(),a=a+
l,p=p+q;b.snapx=0>p||p>b.nc.page.maxw;b.snapy=0>a||a>b.nc.page.maxh;b.speedx=q;b.speedy=l;b.lastx=e;b.lasty=g};this.stop=function(){b.nc.unsynched("domomentum2d");b.timer&&clearTimeout(b.timer);b.timer=0;b.lastscrollx=-1;b.lastscrolly=-1};this.doSnapy=function(e,g){var l=!1;0>g?(g=0,l=!0):g>b.nc.page.maxh&&(g=b.nc.page.maxh,l=!0);0>e?(e=0,l=!0):e>b.nc.page.maxw&&(e=b.nc.page.maxw,l=!0);l?b.nc.doScrollPos(e,g,b.nc.opt.snapbackspeed):b.nc.triggerScrollEnd()};this.doMomentum=function(e){var g=b.time(),
l=e?g+e:b.lasttime;e=b.nc.getScrollLeft();var q=b.nc.getScrollTop(),a=b.nc.page.maxh,p=b.nc.page.maxw;b.speedx=0<p?Math.min(60,b.speedx):0;b.speedy=0<a?Math.min(60,b.speedy):0;l=l&&60>=g-l;if(0>q||q>a||0>e||e>p)l=!1;e=b.speedx&&l?b.speedx:!1;if(b.speedy&&l&&b.speedy||e){var d=Math.max(16,b.steptime);50<d&&(e=d/50,b.speedx*=e,b.speedy*=e,d=50);b.demulxy=0;b.lastscrollx=b.nc.getScrollLeft();b.chkx=b.lastscrollx;b.lastscrolly=b.nc.getScrollTop();b.chky=b.lastscrolly;var r=b.lastscrollx,t=b.lastscrolly,
s=function(){var c=600<b.time()-g?0.04:0.02;if(b.speedx&&(r=Math.floor(b.lastscrollx-b.speedx*(1-b.demulxy)),b.lastscrollx=r,0>r||r>p))c=0.1;if(b.speedy&&(t=Math.floor(b.lastscrolly-b.speedy*(1-b.demulxy)),b.lastscrolly=t,0>t||t>a))c=0.1;b.demulxy=Math.min(1,b.demulxy+c);b.nc.synched("domomentum2d",function(){b.speedx&&(b.nc.getScrollLeft()!=b.chkx&&b.stop(),b.chkx=r,b.nc.setScrollLeft(r));b.speedy&&(b.nc.getScrollTop()!=b.chky&&b.stop(),b.chky=t,b.nc.setScrollTop(t));b.timer||(b.nc.hideCursor(),
b.doSnapy(r,t))});1>b.demulxy?b.timer=setTimeout(s,d):(b.stop(),b.nc.hideCursor(),b.doSnapy(r,t))};s()}else b.doSnapy(b.nc.getScrollLeft(),b.nc.getScrollTop())}},w=e.fn.scrollTop;e.cssHooks.pageYOffset={get:function(g,b,h){return(b=e.data(g,"__nicescroll")||!1)&&b.ishwscroll?b.getScrollTop():w.call(g)},set:function(g,b){var h=e.data(g,"__nicescroll")||!1;h&&h.ishwscroll?h.setScrollTop(parseInt(b)):w.call(g,b);return this}};e.fn.scrollTop=function(g){if("undefined"==typeof g){var b=this[0]?e.data(this[0],
"__nicescroll")||!1:!1;return b&&b.ishwscroll?b.getScrollTop():w.call(this)}return this.each(function(){var b=e.data(this,"__nicescroll")||!1;b&&b.ishwscroll?b.setScrollTop(parseInt(g)):w.call(e(this),g)})};var A=e.fn.scrollLeft;e.cssHooks.pageXOffset={get:function(g,b,h){return(b=e.data(g,"__nicescroll")||!1)&&b.ishwscroll?b.getScrollLeft():A.call(g)},set:function(g,b){var h=e.data(g,"__nicescroll")||!1;h&&h.ishwscroll?h.setScrollLeft(parseInt(b)):A.call(g,b);return this}};e.fn.scrollLeft=function(g){if("undefined"==
typeof g){var b=this[0]?e.data(this[0],"__nicescroll")||!1:!1;return b&&b.ishwscroll?b.getScrollLeft():A.call(this)}return this.each(function(){var b=e.data(this,"__nicescroll")||!1;b&&b.ishwscroll?b.setScrollLeft(parseInt(g)):A.call(e(this),g)})};var B=function(g){var b=this;this.length=0;this.name="nicescrollarray";this.each=function(e){for(var g=0,a=0;g<b.length;g++)e.call(b[g],a++);return b};this.push=function(e){b[b.length]=e;b.length++};this.eq=function(e){return b[e]};if(g)for(var h=0;h<g.length;h++){var k=
e.data(g[h],"__nicescroll")||!1;k&&(this[this.length]=k,this.length++)}return this};(function(e,b,h){for(var k=0;k<b.length;k++)h(e,b[k])})(B.prototype,"show hide toggle onResize resize remove stop doScrollPos".split(" "),function(e,b){e[b]=function(){var e=arguments;return this.each(function(){this[b].apply(this,e)})}});e.fn.getNiceScroll=function(g){return"undefined"==typeof g?new B(this):this[g]&&e.data(this[g],"__nicescroll")||!1};e.extend(e.expr[":"],{nicescroll:function(g){return e.data(g,"__nicescroll")?
!0:!1}});e.fn.niceScroll=function(g,b){"undefined"==typeof b&&("object"==typeof g&&!("jquery"in g))&&(b=g,g=!1);var h=new B;"undefined"==typeof b&&(b={});g&&(b.doc=e(g),b.win=e(this));var k=!("doc"in b);!k&&!("win"in b)&&(b.win=e(this));this.each(function(){var g=e(this).data("__nicescroll")||!1;g||(b.doc=k?e(this):b.doc,g=new N(b,e(this)),e(this).data("__nicescroll",g));h.push(g)});return 1==h.length?h[0]:h};window.NiceScroll={getjQuery:function(){return e}};e.nicescroll||(e.nicescroll=new B,e.nicescroll.options=
G)});

/**!
 * easyPieChart
 * Lightweight plugin to render simple, animated and retina optimized pie charts
 *
 * @license 
 * @author Robert Fleischmann <rendro87@gmail.com> (http://robert-fleischmann.de)
 * @version 2.1.5
 **/
!function(a,b){"object"==typeof exports?module.exports=b(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],b):b(a.jQuery)}(this,function(a){var b=function(a,b){var c,d=document.createElement("canvas");a.appendChild(d),"undefined"!=typeof G_vmlCanvasManager&&G_vmlCanvasManager.initElement(d);var e=d.getContext("2d");d.width=d.height=b.size;var f=1;window.devicePixelRatio>1&&(f=window.devicePixelRatio,d.style.width=d.style.height=[b.size,"px"].join(""),d.width=d.height=b.size*f,e.scale(f,f)),e.translate(b.size/2,b.size/2),e.rotate((-0.5+b.rotate/180)*Math.PI);var g=(b.size-b.lineWidth)/2;b.scaleColor&&b.scaleLength&&(g-=b.scaleLength+2),Date.now=Date.now||function(){return+new Date};var h=function(a,b,c){c=Math.min(Math.max(-1,c||0),1);var d=0>=c?!0:!1;e.beginPath(),e.arc(0,0,g,0,2*Math.PI*c,d),e.strokeStyle=a,e.lineWidth=b,e.stroke()},i=function(){var a,c;e.lineWidth=1,e.fillStyle=b.scaleColor,e.save();for(var d=24;d>0;--d)d%6===0?(c=b.scaleLength,a=0):(c=.6*b.scaleLength,a=b.scaleLength-c),e.fillRect(-b.size/2+a,0,c,1),e.rotate(Math.PI/12);e.restore()},j=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(a){window.setTimeout(a,1e3/60)}}(),k=function(){b.scaleColor&&i(),b.trackColor&&h(b.trackColor,b.lineWidth,1)};this.getCanvas=function(){return d},this.getCtx=function(){return e},this.clear=function(){e.clearRect(b.size/-2,b.size/-2,b.size,b.size)},this.draw=function(a){b.scaleColor||b.trackColor?e.getImageData&&e.putImageData?c?e.putImageData(c,0,0):(k(),c=e.getImageData(0,0,b.size*f,b.size*f)):(this.clear(),k()):this.clear(),e.lineCap=b.lineCap;var d;d="function"==typeof b.barColor?b.barColor(a):b.barColor,h(d,b.lineWidth,a/100)}.bind(this),this.animate=function(a,c){var d=Date.now();b.onStart(a,c);var e=function(){var f=Math.min(Date.now()-d,b.animate.duration),g=b.easing(this,f,a,c-a,b.animate.duration);this.draw(g),b.onStep(a,c,g),f>=b.animate.duration?b.onStop(a,c):j(e)}.bind(this);j(e)}.bind(this)},c=function(a,c){var d={barColor:"#ef1e25",trackColor:"#f9f9f9",scaleColor:"#dfe0e0",scaleLength:5,lineCap:"round",lineWidth:3,size:110,rotate:0,animate:{duration:1e3,enabled:!0},easing:function(a,b,c,d,e){return b/=e/2,1>b?d/2*b*b+c:-d/2*(--b*(b-2)-1)+c},onStart:function(){},onStep:function(){},onStop:function(){}};if("undefined"!=typeof b)d.renderer=b;else{if("undefined"==typeof SVGRenderer)throw new Error("Please load either the SVG- or the CanvasRenderer");d.renderer=SVGRenderer}var e={},f=0,g=function(){this.el=a,this.options=e;for(var b in d)d.hasOwnProperty(b)&&(e[b]=c&&"undefined"!=typeof c[b]?c[b]:d[b],"function"==typeof e[b]&&(e[b]=e[b].bind(this)));e.easing="string"==typeof e.easing&&"undefined"!=typeof jQuery&&jQuery.isFunction(jQuery.easing[e.easing])?jQuery.easing[e.easing]:d.easing,"number"==typeof e.animate&&(e.animate={duration:e.animate,enabled:!0}),"boolean"!=typeof e.animate||e.animate||(e.animate={duration:1e3,enabled:e.animate}),this.renderer=new e.renderer(a,e),this.renderer.draw(f),a.dataset&&a.dataset.percent?this.update(parseFloat(a.dataset.percent)):a.getAttribute&&a.getAttribute("data-percent")&&this.update(parseFloat(a.getAttribute("data-percent")))}.bind(this);this.update=function(a){return a=parseFloat(a),e.animate.enabled?this.renderer.animate(f,a):this.renderer.draw(a),f=a,this}.bind(this),this.disableAnimation=function(){return e.animate.enabled=!1,this},this.enableAnimation=function(){return e.animate.enabled=!0,this},g()};a.fn.easyPieChart=function(b){return this.each(function(){var d;a.data(this,"easyPieChart")||(d=a.extend({},b,a(this).data()),a.data(this,"easyPieChart",new c(this,d)))})}});


/* Parallax Plugins */
/*! Stellar.js v0.6.2 | Copyright 2014, Mark Dalgleish | http://markdalgleish.com/projects/stellar.js | http://markdalgleish.mit-license.org */
!function(a,b,c,d){function e(b,c){this.element=b,this.options=a.extend({},g,c),this._defaults=g,this._name=f,this.init()}var f="stellar",g={scrollProperty:"scroll",positionProperty:"position",horizontalScrolling:!0,verticalScrolling:!0,horizontalOffset:0,verticalOffset:0,responsive:!1,parallaxBackgrounds:!0,parallaxElements:!0,hideDistantElements:!0,hideElement:function(a){a.hide()},showElement:function(a){a.show()}},h={scroll:{getLeft:function(a){return a.scrollLeft()},setLeft:function(a,b){a.scrollLeft(b)},getTop:function(a){return a.scrollTop()},setTop:function(a,b){a.scrollTop(b)}},position:{getLeft:function(a){return-1*parseInt(a.css("left"),10)},getTop:function(a){return-1*parseInt(a.css("top"),10)}},margin:{getLeft:function(a){return-1*parseInt(a.css("margin-left"),10)},getTop:function(a){return-1*parseInt(a.css("margin-top"),10)}},transform:{getLeft:function(a){var b=getComputedStyle(a[0])[k];return"none"!==b?-1*parseInt(b.match(/(-?[0-9]+)/g)[4],10):0},getTop:function(a){var b=getComputedStyle(a[0])[k];return"none"!==b?-1*parseInt(b.match(/(-?[0-9]+)/g)[5],10):0}}},i={position:{setLeft:function(a,b){a.css("left",b)},setTop:function(a,b){a.css("top",b)}},transform:{setPosition:function(a,b,c,d,e){a[0].style[k]="translate3d("+(b-c)+"px, "+(d-e)+"px, 0)"}}},j=function(){var b,c=/^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,d=a("script")[0].style,e="";for(b in d)if(c.test(b)){e=b.match(c)[0];break}return"WebkitOpacity"in d&&(e="Webkit"),"KhtmlOpacity"in d&&(e="Khtml"),function(a){return e+(e.length>0?a.charAt(0).toUpperCase()+a.slice(1):a)}}(),k=j("transform"),l=a("<div />",{style:"background:#fff"}).css("background-position-x")!==d,m=l?function(a,b,c){a.css({"background-position-x":b,"background-position-y":c})}:function(a,b,c){a.css("background-position",b+" "+c)},n=l?function(a){return[a.css("background-position-x"),a.css("background-position-y")]}:function(a){return a.css("background-position").split(" ")},o=b.requestAnimationFrame||b.webkitRequestAnimationFrame||b.mozRequestAnimationFrame||b.oRequestAnimationFrame||b.msRequestAnimationFrame||function(a){setTimeout(a,1e3/60)};e.prototype={init:function(){this.options.name=f+"_"+Math.floor(1e9*Math.random()),this._defineElements(),this._defineGetters(),this._defineSetters(),this._handleWindowLoadAndResize(),this._detectViewport(),this.refresh({firstLoad:!0}),"scroll"===this.options.scrollProperty?this._handleScrollEvent():this._startAnimationLoop()},_defineElements:function(){this.element===c.body&&(this.element=b),this.$scrollElement=a(this.element),this.$element=this.element===b?a("body"):this.$scrollElement,this.$viewportElement=this.options.viewportElement!==d?a(this.options.viewportElement):this.$scrollElement[0]===b||"scroll"===this.options.scrollProperty?this.$scrollElement:this.$scrollElement.parent()},_defineGetters:function(){var a=this,b=h[a.options.scrollProperty];this._getScrollLeft=function(){return b.getLeft(a.$scrollElement)},this._getScrollTop=function(){return b.getTop(a.$scrollElement)}},_defineSetters:function(){var b=this,c=h[b.options.scrollProperty],d=i[b.options.positionProperty],e=c.setLeft,f=c.setTop;this._setScrollLeft="function"==typeof e?function(a){e(b.$scrollElement,a)}:a.noop,this._setScrollTop="function"==typeof f?function(a){f(b.$scrollElement,a)}:a.noop,this._setPosition=d.setPosition||function(a,c,e,f,g){b.options.horizontalScrolling&&d.setLeft(a,c,e),b.options.verticalScrolling&&d.setTop(a,f,g)}},_handleWindowLoadAndResize:function(){var c=this,d=a(b);c.options.responsive&&d.bind("load."+this.name,function(){c.refresh()}),d.bind("resize."+this.name,function(){c._detectViewport(),c.options.responsive&&c.refresh()})},refresh:function(c){var d=this,e=d._getScrollLeft(),f=d._getScrollTop();c&&c.firstLoad||this._reset(),this._setScrollLeft(0),this._setScrollTop(0),this._setOffsets(),this._findParticles(),this._findBackgrounds(),c&&c.firstLoad&&/WebKit/.test(navigator.userAgent)&&a(b).load(function(){var a=d._getScrollLeft(),b=d._getScrollTop();d._setScrollLeft(a+1),d._setScrollTop(b+1),d._setScrollLeft(a),d._setScrollTop(b)}),this._setScrollLeft(e),this._setScrollTop(f)},_detectViewport:function(){var a=this.$viewportElement.offset(),b=null!==a&&a!==d;this.viewportWidth=this.$viewportElement.width(),this.viewportHeight=this.$viewportElement.height(),this.viewportOffsetTop=b?a.top:0,this.viewportOffsetLeft=b?a.left:0},_findParticles:function(){{var b=this;this._getScrollLeft(),this._getScrollTop()}if(this.particles!==d)for(var c=this.particles.length-1;c>=0;c--)this.particles[c].$element.data("stellar-elementIsActive",d);this.particles=[],this.options.parallaxElements&&this.$element.find("[data-stellar-ratio]").each(function(){var c,e,f,g,h,i,j,k,l,m=a(this),n=0,o=0,p=0,q=0;if(m.data("stellar-elementIsActive")){if(m.data("stellar-elementIsActive")!==this)return}else m.data("stellar-elementIsActive",this);b.options.showElement(m),m.data("stellar-startingLeft")?(m.css("left",m.data("stellar-startingLeft")),m.css("top",m.data("stellar-startingTop"))):(m.data("stellar-startingLeft",m.css("left")),m.data("stellar-startingTop",m.css("top"))),f=m.position().left,g=m.position().top,h="auto"===m.css("margin-left")?0:parseInt(m.css("margin-left"),10),i="auto"===m.css("margin-top")?0:parseInt(m.css("margin-top"),10),k=m.offset().left-h,l=m.offset().top-i,m.parents().each(function(){var b=a(this);return b.data("stellar-offset-parent")===!0?(n=p,o=q,j=b,!1):(p+=b.position().left,void(q+=b.position().top))}),c=m.data("stellar-horizontal-offset")!==d?m.data("stellar-horizontal-offset"):j!==d&&j.data("stellar-horizontal-offset")!==d?j.data("stellar-horizontal-offset"):b.horizontalOffset,e=m.data("stellar-vertical-offset")!==d?m.data("stellar-vertical-offset"):j!==d&&j.data("stellar-vertical-offset")!==d?j.data("stellar-vertical-offset"):b.verticalOffset,b.particles.push({$element:m,$offsetParent:j,isFixed:"fixed"===m.css("position"),horizontalOffset:c,verticalOffset:e,startingPositionLeft:f,startingPositionTop:g,startingOffsetLeft:k,startingOffsetTop:l,parentOffsetLeft:n,parentOffsetTop:o,stellarRatio:m.data("stellar-ratio")!==d?m.data("stellar-ratio"):1,width:m.outerWidth(!0),height:m.outerHeight(!0),isHidden:!1})})},_findBackgrounds:function(){var b,c=this,e=this._getScrollLeft(),f=this._getScrollTop();this.backgrounds=[],this.options.parallaxBackgrounds&&(b=this.$element.find("[data-stellar-background-ratio]"),this.$element.data("stellar-background-ratio")&&(b=b.add(this.$element)),b.each(function(){var b,g,h,i,j,k,l,o=a(this),p=n(o),q=0,r=0,s=0,t=0;if(o.data("stellar-backgroundIsActive")){if(o.data("stellar-backgroundIsActive")!==this)return}else o.data("stellar-backgroundIsActive",this);o.data("stellar-backgroundStartingLeft")?m(o,o.data("stellar-backgroundStartingLeft"),o.data("stellar-backgroundStartingTop")):(o.data("stellar-backgroundStartingLeft",p[0]),o.data("stellar-backgroundStartingTop",p[1])),h="auto"===o.css("margin-left")?0:parseInt(o.css("margin-left"),10),i="auto"===o.css("margin-top")?0:parseInt(o.css("margin-top"),10),j=o.offset().left-h-e,k=o.offset().top-i-f,o.parents().each(function(){var b=a(this);return b.data("stellar-offset-parent")===!0?(q=s,r=t,l=b,!1):(s+=b.position().left,void(t+=b.position().top))}),b=o.data("stellar-horizontal-offset")!==d?o.data("stellar-horizontal-offset"):l!==d&&l.data("stellar-horizontal-offset")!==d?l.data("stellar-horizontal-offset"):c.horizontalOffset,g=o.data("stellar-vertical-offset")!==d?o.data("stellar-vertical-offset"):l!==d&&l.data("stellar-vertical-offset")!==d?l.data("stellar-vertical-offset"):c.verticalOffset,c.backgrounds.push({$element:o,$offsetParent:l,isFixed:"fixed"===o.css("background-attachment"),horizontalOffset:b,verticalOffset:g,startingValueLeft:p[0],startingValueTop:p[1],startingBackgroundPositionLeft:isNaN(parseInt(p[0],10))?0:parseInt(p[0],10),startingBackgroundPositionTop:isNaN(parseInt(p[1],10))?0:parseInt(p[1],10),startingPositionLeft:o.position().left,startingPositionTop:o.position().top,startingOffsetLeft:j,startingOffsetTop:k,parentOffsetLeft:q,parentOffsetTop:r,stellarRatio:o.data("stellar-background-ratio")===d?1:o.data("stellar-background-ratio")})}))},_reset:function(){var a,b,c,d,e;for(e=this.particles.length-1;e>=0;e--)a=this.particles[e],b=a.$element.data("stellar-startingLeft"),c=a.$element.data("stellar-startingTop"),this._setPosition(a.$element,b,b,c,c),this.options.showElement(a.$element),a.$element.data("stellar-startingLeft",null).data("stellar-elementIsActive",null).data("stellar-backgroundIsActive",null);for(e=this.backgrounds.length-1;e>=0;e--)d=this.backgrounds[e],d.$element.data("stellar-backgroundStartingLeft",null).data("stellar-backgroundStartingTop",null),m(d.$element,d.startingValueLeft,d.startingValueTop)},destroy:function(){this._reset(),this.$scrollElement.unbind("resize."+this.name).unbind("scroll."+this.name),this._animationLoop=a.noop,a(b).unbind("load."+this.name).unbind("resize."+this.name)},_setOffsets:function(){var c=this,d=a(b);d.unbind("resize.horizontal-"+this.name).unbind("resize.vertical-"+this.name),"function"==typeof this.options.horizontalOffset?(this.horizontalOffset=this.options.horizontalOffset(),d.bind("resize.horizontal-"+this.name,function(){c.horizontalOffset=c.options.horizontalOffset()})):this.horizontalOffset=this.options.horizontalOffset,"function"==typeof this.options.verticalOffset?(this.verticalOffset=this.options.verticalOffset(),d.bind("resize.vertical-"+this.name,function(){c.verticalOffset=c.options.verticalOffset()})):this.verticalOffset=this.options.verticalOffset},_repositionElements:function(){var a,b,c,d,e,f,g,h,i,j,k=this._getScrollLeft(),l=this._getScrollTop(),n=!0,o=!0;if(this.currentScrollLeft!==k||this.currentScrollTop!==l||this.currentWidth!==this.viewportWidth||this.currentHeight!==this.viewportHeight){for(this.currentScrollLeft=k,this.currentScrollTop=l,this.currentWidth=this.viewportWidth,this.currentHeight=this.viewportHeight,j=this.particles.length-1;j>=0;j--)a=this.particles[j],b=a.isFixed?1:0,this.options.horizontalScrolling?(f=(k+a.horizontalOffset+this.viewportOffsetLeft+a.startingPositionLeft-a.startingOffsetLeft+a.parentOffsetLeft)*-(a.stellarRatio+b-1)+a.startingPositionLeft,h=f-a.startingPositionLeft+a.startingOffsetLeft):(f=a.startingPositionLeft,h=a.startingOffsetLeft),this.options.verticalScrolling?(g=(l+a.verticalOffset+this.viewportOffsetTop+a.startingPositionTop-a.startingOffsetTop+a.parentOffsetTop)*-(a.stellarRatio+b-1)+a.startingPositionTop,i=g-a.startingPositionTop+a.startingOffsetTop):(g=a.startingPositionTop,i=a.startingOffsetTop),this.options.hideDistantElements&&(o=!this.options.horizontalScrolling||h+a.width>(a.isFixed?0:k)&&h<(a.isFixed?0:k)+this.viewportWidth+this.viewportOffsetLeft,n=!this.options.verticalScrolling||i+a.height>(a.isFixed?0:l)&&i<(a.isFixed?0:l)+this.viewportHeight+this.viewportOffsetTop),o&&n?(a.isHidden&&(this.options.showElement(a.$element),a.isHidden=!1),this._setPosition(a.$element,f,a.startingPositionLeft,g,a.startingPositionTop)):a.isHidden||(this.options.hideElement(a.$element),a.isHidden=!0);for(j=this.backgrounds.length-1;j>=0;j--)c=this.backgrounds[j],b=c.isFixed?0:1,d=this.options.horizontalScrolling?(k+c.horizontalOffset-this.viewportOffsetLeft-c.startingOffsetLeft+c.parentOffsetLeft-c.startingBackgroundPositionLeft)*(b-c.stellarRatio)+"px":c.startingValueLeft,e=this.options.verticalScrolling?(l+c.verticalOffset-this.viewportOffsetTop-c.startingOffsetTop+c.parentOffsetTop-c.startingBackgroundPositionTop)*(b-c.stellarRatio)+"px":c.startingValueTop,m(c.$element,d,e)}},_handleScrollEvent:function(){var a=this,b=!1,c=function(){a._repositionElements(),b=!1},d=function(){b||(o(c),b=!0)};this.$scrollElement.bind("scroll."+this.name,d),d()},_startAnimationLoop:function(){var a=this;this._animationLoop=function(){o(a._animationLoop),a._repositionElements()},this._animationLoop()}},a.fn[f]=function(b){var c=arguments;return b===d||"object"==typeof b?this.each(function(){a.data(this,"plugin_"+f)||a.data(this,"plugin_"+f,new e(this,b))}):"string"==typeof b&&"_"!==b[0]&&"init"!==b?this.each(function(){var d=a.data(this,"plugin_"+f);d instanceof e&&"function"==typeof d[b]&&d[b].apply(d,Array.prototype.slice.call(c,1)),"destroy"===b&&a.data(this,"plugin_"+f,null)}):void 0},a[f]=function(){var c=a(b);return c.stellar.apply(c,Array.prototype.slice.call(arguments,0))},a[f].scrollProperty=h,a[f].positionProperty=i,b.Stellar=e}(jQuery,this,document);


/*! Magnific Popup - v0.9.5 - 2013-08-21
* http://dimsemenov.com/plugins/magnific-popup/
* Copyright (c) 2013 Dmitry Semenov; */
(function(e){var t,i,n,o,a,r,s,l="Close",c="BeforeClose",d="AfterClose",u="BeforeAppend",p="MarkupParse",f="Open",m="Change",g="mfp",v="."+g,h="mfp-ready",C="mfp-removing",y="mfp-prevent-close",w=function(){},b=!!window.jQuery,I=e(window),x=function(e,i){t.ev.on(g+e+v,i)},k=function(t,i,n,o){var a=document.createElement("div");return a.className="mfp-"+t,n&&(a.innerHTML=n),o?i&&i.appendChild(a):(a=e(a),i&&a.appendTo(i)),a},T=function(i,n){t.ev.triggerHandler(g+i,n),t.st.callbacks&&(i=i.charAt(0).toLowerCase()+i.slice(1),t.st.callbacks[i]&&t.st.callbacks[i].apply(t,e.isArray(n)?n:[n]))},E=function(){(t.st.focus?t.content.find(t.st.focus).eq(0):t.wrap).focus()},S=function(i){return i===s&&t.currTemplate.closeBtn||(t.currTemplate.closeBtn=e(t.st.closeMarkup.replace("%title%",t.st.tClose)),s=i),t.currTemplate.closeBtn},P=function(){e.magnificPopup.instance||(t=new w,t.init(),e.magnificPopup.instance=t)},_=function(i){if(!e(i).hasClass(y)){var n=t.st.closeOnContentClick,o=t.st.closeOnBgClick;if(n&&o)return!0;if(!t.content||e(i).hasClass("mfp-close")||t.preloader&&i===t.preloader[0])return!0;if(i===t.content[0]||e.contains(t.content[0],i)){if(n)return!0}else if(o&&e.contains(document,i))return!0;return!1}},O=function(){var e=document.createElement("p").style,t=["ms","O","Moz","Webkit"];if(void 0!==e.transition)return!0;for(;t.length;)if(t.pop()+"Transition"in e)return!0;return!1};w.prototype={constructor:w,init:function(){var i=navigator.appVersion;t.isIE7=-1!==i.indexOf("MSIE 7."),t.isIE8=-1!==i.indexOf("MSIE 8."),t.isLowIE=t.isIE7||t.isIE8,t.isAndroid=/android/gi.test(i),t.isIOS=/iphone|ipad|ipod/gi.test(i),t.supportsTransition=O(),t.probablyMobile=t.isAndroid||t.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),n=e(document.body),o=e(document),t.popupsCache={}},open:function(i){var n;if(i.isObj===!1){t.items=i.items.toArray(),t.index=0;var a,s=i.items;for(n=0;s.length>n;n++)if(a=s[n],a.parsed&&(a=a.el[0]),a===i.el[0]){t.index=n;break}}else t.items=e.isArray(i.items)?i.items:[i.items],t.index=i.index||0;if(t.isOpen)return t.updateItemHTML(),void 0;t.types=[],r="",t.ev=i.mainEl&&i.mainEl.length?i.mainEl.eq(0):o,i.key?(t.popupsCache[i.key]||(t.popupsCache[i.key]={}),t.currTemplate=t.popupsCache[i.key]):t.currTemplate={},t.st=e.extend(!0,{},e.magnificPopup.defaults,i),t.fixedContentPos="auto"===t.st.fixedContentPos?!t.probablyMobile:t.st.fixedContentPos,t.st.modal&&(t.st.closeOnContentClick=!1,t.st.closeOnBgClick=!1,t.st.showCloseBtn=!1,t.st.enableEscapeKey=!1),t.bgOverlay||(t.bgOverlay=k("bg").on("click"+v,function(){t.close()}),t.wrap=k("wrap").attr("tabindex",-1).on("click"+v,function(e){_(e.target)&&t.close()}),t.container=k("container",t.wrap)),t.contentContainer=k("content"),t.st.preloader&&(t.preloader=k("preloader",t.container,t.st.tLoading));var l=e.magnificPopup.modules;for(n=0;l.length>n;n++){var c=l[n];c=c.charAt(0).toUpperCase()+c.slice(1),t["init"+c].call(t)}T("BeforeOpen"),t.st.showCloseBtn&&(t.st.closeBtnInside?(x(p,function(e,t,i,n){i.close_replaceWith=S(n.type)}),r+=" mfp-close-btn-in"):t.wrap.append(S())),t.st.alignTop&&(r+=" mfp-align-top"),t.fixedContentPos?t.wrap.css({overflow:t.st.overflowY,overflowX:"hidden",overflowY:t.st.overflowY}):t.wrap.css({top:I.scrollTop(),position:"absolute"}),(t.st.fixedBgPos===!1||"auto"===t.st.fixedBgPos&&!t.fixedContentPos)&&t.bgOverlay.css({height:o.height(),position:"absolute"}),t.st.enableEscapeKey&&o.on("keyup"+v,function(e){27===e.keyCode&&t.close()}),I.on("resize"+v,function(){t.updateSize()}),t.st.closeOnContentClick||(r+=" mfp-auto-cursor"),r&&t.wrap.addClass(r);var d=t.wH=I.height(),u={};if(t.fixedContentPos&&t._hasScrollBar(d)){var m=t._getScrollbarSize();m&&(u.paddingRight=m)}t.fixedContentPos&&(t.isIE7?e("body, html").css("overflow","hidden"):u.overflow="hidden");var g=t.st.mainClass;t.isIE7&&(g+=" mfp-ie7"),g&&t._addClassToMFP(g),t.updateItemHTML(),T("BuildControls"),e("html").css(u),t.bgOverlay.add(t.wrap).prependTo(document.body),t._lastFocusedEl=document.activeElement,setTimeout(function(){t.content?(t._addClassToMFP(h),E()):t.bgOverlay.addClass(h),o.on("focusin"+v,function(i){return i.target===t.wrap[0]||e.contains(t.wrap[0],i.target)?void 0:(E(),!1)})},16),t.isOpen=!0,t.updateSize(d),T(f)},close:function(){t.isOpen&&(T(c),t.isOpen=!1,t.st.removalDelay&&!t.isLowIE&&t.supportsTransition?(t._addClassToMFP(C),setTimeout(function(){t._close()},t.st.removalDelay)):t._close())},_close:function(){T(l);var i=C+" "+h+" ";if(t.bgOverlay.detach(),t.wrap.detach(),t.container.empty(),t.st.mainClass&&(i+=t.st.mainClass+" "),t._removeClassFromMFP(i),t.fixedContentPos){var n={paddingRight:""};t.isIE7?e("body, html").css("overflow",""):n.overflow="",e("html").css(n)}o.off("keyup"+v+" focusin"+v),t.ev.off(v),t.wrap.attr("class","mfp-wrap").removeAttr("style"),t.bgOverlay.attr("class","mfp-bg"),t.container.attr("class","mfp-container"),!t.st.showCloseBtn||t.st.closeBtnInside&&t.currTemplate[t.currItem.type]!==!0||t.currTemplate.closeBtn&&t.currTemplate.closeBtn.detach(),t._lastFocusedEl&&e(t._lastFocusedEl).focus(),t.currItem=null,t.content=null,t.currTemplate=null,t.prevHeight=0,T(d)},updateSize:function(e){if(t.isIOS){var i=document.documentElement.clientWidth/window.innerWidth,n=window.innerHeight*i;t.wrap.css("height",n),t.wH=n}else t.wH=e||I.height();t.fixedContentPos||t.wrap.css("height",t.wH),T("Resize")},updateItemHTML:function(){var i=t.items[t.index];t.contentContainer.detach(),t.content&&t.content.detach(),i.parsed||(i=t.parseEl(t.index));var n=i.type;if(T("BeforeChange",[t.currItem?t.currItem.type:"",n]),t.currItem=i,!t.currTemplate[n]){var o=t.st[n]?t.st[n].markup:!1;T("FirstMarkupParse",o),t.currTemplate[n]=o?e(o):!0}a&&a!==i.type&&t.container.removeClass("mfp-"+a+"-holder");var r=t["get"+n.charAt(0).toUpperCase()+n.slice(1)](i,t.currTemplate[n]);t.appendContent(r,n),i.preloaded=!0,T(m,i),a=i.type,t.container.prepend(t.contentContainer),T("AfterChange")},appendContent:function(e,i){t.content=e,e?t.st.showCloseBtn&&t.st.closeBtnInside&&t.currTemplate[i]===!0?t.content.find(".mfp-close").length||t.content.append(S()):t.content=e:t.content="",T(u),t.container.addClass("mfp-"+i+"-holder"),t.contentContainer.append(t.content)},parseEl:function(i){var n=t.items[i],o=n.type;if(n=n.tagName?{el:e(n)}:{data:n,src:n.src},n.el){for(var a=t.types,r=0;a.length>r;r++)if(n.el.hasClass("mfp-"+a[r])){o=a[r];break}n.src=n.el.attr("data-mfp-src"),n.src||(n.src=n.el.attr("href"))}return n.type=o||t.st.type||"inline",n.index=i,n.parsed=!0,t.items[i]=n,T("ElementParse",n),t.items[i]},addGroup:function(e,i){var n=function(n){n.mfpEl=this,t._openClick(n,e,i)};i||(i={});var o="click.magnificPopup";i.mainEl=e,i.items?(i.isObj=!0,e.off(o).on(o,n)):(i.isObj=!1,i.delegate?e.off(o).on(o,i.delegate,n):(i.items=e,e.off(o).on(o,n)))},_openClick:function(i,n,o){var a=void 0!==o.midClick?o.midClick:e.magnificPopup.defaults.midClick;if(a||2!==i.which&&!i.ctrlKey&&!i.metaKey){var r=void 0!==o.disableOn?o.disableOn:e.magnificPopup.defaults.disableOn;if(r)if(e.isFunction(r)){if(!r.call(t))return!0}else if(r>I.width())return!0;i.type&&(i.preventDefault(),t.isOpen&&i.stopPropagation()),o.el=e(i.mfpEl),o.delegate&&(o.items=n.find(o.delegate)),t.open(o)}},updateStatus:function(e,n){if(t.preloader){i!==e&&t.container.removeClass("mfp-s-"+i),n||"loading"!==e||(n=t.st.tLoading);var o={status:e,text:n};T("UpdateStatus",o),e=o.status,n=o.text,t.preloader.html(n),t.preloader.find("a").on("click",function(e){e.stopImmediatePropagation()}),t.container.addClass("mfp-s-"+e),i=e}},_addClassToMFP:function(e){t.bgOverlay.addClass(e),t.wrap.addClass(e)},_removeClassFromMFP:function(e){this.bgOverlay.removeClass(e),t.wrap.removeClass(e)},_hasScrollBar:function(e){return(t.isIE7?o.height():document.body.scrollHeight)>(e||I.height())},_parseMarkup:function(t,i,n){var o;n.data&&(i=e.extend(n.data,i)),T(p,[t,i,n]),e.each(i,function(e,i){if(void 0===i||i===!1)return!0;if(o=e.split("_"),o.length>1){var n=t.find(v+"-"+o[0]);if(n.length>0){var a=o[1];"replaceWith"===a?n[0]!==i[0]&&n.replaceWith(i):"img"===a?n.is("img")?n.attr("src",i):n.replaceWith('<img src="'+i+'" class="'+n.attr("class")+'" />'):n.attr(o[1],i)}}else t.find(v+"-"+e).html(i)})},_getScrollbarSize:function(){if(void 0===t.scrollbarSize){var e=document.createElement("div");e.id="mfp-sbm",e.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(e),t.scrollbarSize=e.offsetWidth-e.clientWidth,document.body.removeChild(e)}return t.scrollbarSize}},e.magnificPopup={instance:null,proto:w.prototype,modules:[],open:function(e,t){return P(),e||(e={}),e.isObj=!0,e.index=t||0,this.instance.open(e)},close:function(){return e.magnificPopup.instance.close()},registerModule:function(t,i){i.options&&(e.magnificPopup.defaults[t]=i.options),e.extend(this.proto,i.proto),this.modules.push(t)},defaults:{disableOn:0,key:null,midClick:!1,mainClass:"",preloader:!0,focus:"",closeOnContentClick:!1,closeOnBgClick:!0,closeBtnInside:!0,showCloseBtn:!0,enableEscapeKey:!0,modal:!1,alignTop:!1,removalDelay:0,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">&times;</button>',tClose:"Close (Esc)",tLoading:"Loading..."}},e.fn.magnificPopup=function(i){P();var n=e(this);if("string"==typeof i)if("open"===i){var o,a=b?n.data("magnificPopup"):n[0].magnificPopup,r=parseInt(arguments[1],10)||0;a.items?o=a.items[r]:(o=n,a.delegate&&(o=o.find(a.delegate)),o=o.eq(r)),t._openClick({mfpEl:o},n,a)}else t.isOpen&&t[i].apply(t,Array.prototype.slice.call(arguments,1));else b?n.data("magnificPopup",i):n[0].magnificPopup=i,t.addGroup(n,i);return n};var z,M,B,H="inline",L=function(){B&&(M.after(B.addClass(z)).detach(),B=null)};e.magnificPopup.registerModule(H,{options:{hiddenClass:"hide",markup:"",tNotFound:"Content not found"},proto:{initInline:function(){t.types.push(H),x(l+"."+H,function(){L()})},getInline:function(i,n){if(L(),i.src){var o=t.st.inline,a=e(i.src);if(a.length){var r=a[0].parentNode;r&&r.tagName&&(M||(z=o.hiddenClass,M=k(z),z="mfp-"+z),B=a.after(M).detach().removeClass(z)),t.updateStatus("ready")}else t.updateStatus("error",o.tNotFound),a=e("<div>");return i.inlineElement=a,a}return t.updateStatus("ready"),t._parseMarkup(n,{},i),n}}});var A,F="ajax",j=function(){A&&n.removeClass(A)};e.magnificPopup.registerModule(F,{options:{settings:null,cursor:"mfp-ajax-cur",tError:'<a href="%url%">The content</a> could not be loaded.'},proto:{initAjax:function(){t.types.push(F),A=t.st.ajax.cursor,x(l+"."+F,function(){j(),t.req&&t.req.abort()})},getAjax:function(i){A&&n.addClass(A),t.updateStatus("loading");var o=e.extend({url:i.src,success:function(n,o,a){var r={data:n,xhr:a};T("ParseAjax",r),t.appendContent(e(r.data),F),i.finished=!0,j(),E(),setTimeout(function(){t.wrap.addClass(h)},16),t.updateStatus("ready"),T("AjaxContentAdded")},error:function(){j(),i.finished=i.loadError=!0,t.updateStatus("error",t.st.ajax.tError.replace("%url%",i.src))}},t.st.ajax.settings);return t.req=e.ajax(o),""}}});var N,W=function(i){if(i.data&&void 0!==i.data.title)return i.data.title;var n=t.st.image.titleSrc;if(n){if(e.isFunction(n))return n.call(t,i);if(i.el)return i.el.attr(n)||""}return""};e.magnificPopup.registerModule("image",{options:{markup:'<div class="mfp-figure"><div class="mfp-close"></div><div class="mfp-img"></div><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></div>',cursor:"mfp-zoom-out-cur",titleSrc:"title",verticalFit:!0,tError:'<a href="%url%">The image</a> could not be loaded.'},proto:{initImage:function(){var e=t.st.image,i=".image";t.types.push("image"),x(f+i,function(){"image"===t.currItem.type&&e.cursor&&n.addClass(e.cursor)}),x(l+i,function(){e.cursor&&n.removeClass(e.cursor),I.off("resize"+v)}),x("Resize"+i,t.resizeImage),t.isLowIE&&x("AfterChange",t.resizeImage)},resizeImage:function(){var e=t.currItem;if(e&&e.img&&t.st.image.verticalFit){var i=0;t.isLowIE&&(i=parseInt(e.img.css("padding-top"),10)+parseInt(e.img.css("padding-bottom"),10)),e.img.css("max-height",t.wH-i)}},_onImageHasSize:function(e){e.img&&(e.hasSize=!0,N&&clearInterval(N),e.isCheckingImgSize=!1,T("ImageHasSize",e),e.imgHidden&&(t.content&&t.content.removeClass("mfp-loading"),e.imgHidden=!1))},findImageSize:function(e){var i=0,n=e.img[0],o=function(a){N&&clearInterval(N),N=setInterval(function(){return n.naturalWidth>0?(t._onImageHasSize(e),void 0):(i>200&&clearInterval(N),i++,3===i?o(10):40===i?o(50):100===i&&o(500),void 0)},a)};o(1)},getImage:function(i,n){var o=0,a=function(){i&&(i.img[0].complete?(i.img.off(".mfploader"),i===t.currItem&&(t._onImageHasSize(i),t.updateStatus("ready")),i.hasSize=!0,i.loaded=!0,T("ImageLoadComplete")):(o++,200>o?setTimeout(a,100):r()))},r=function(){i&&(i.img.off(".mfploader"),i===t.currItem&&(t._onImageHasSize(i),t.updateStatus("error",s.tError.replace("%url%",i.src))),i.hasSize=!0,i.loaded=!0,i.loadError=!0)},s=t.st.image,l=n.find(".mfp-img");if(l.length){var c=document.createElement("img");c.className="mfp-img",i.img=e(c).on("load.mfploader",a).on("error.mfploader",r),c.src=i.src,l.is("img")&&(i.img=i.img.clone()),i.img[0].naturalWidth>0&&(i.hasSize=!0)}return t._parseMarkup(n,{title:W(i),img_replaceWith:i.img},i),t.resizeImage(),i.hasSize?(N&&clearInterval(N),i.loadError?(n.addClass("mfp-loading"),t.updateStatus("error",s.tError.replace("%url%",i.src))):(n.removeClass("mfp-loading"),t.updateStatus("ready")),n):(t.updateStatus("loading"),i.loading=!0,i.hasSize||(i.imgHidden=!0,n.addClass("mfp-loading"),t.findImageSize(i)),n)}}});var R,Z=function(){return void 0===R&&(R=void 0!==document.createElement("p").style.MozTransform),R};e.magnificPopup.registerModule("zoom",{options:{enabled:!1,easing:"ease-in-out",duration:300,opener:function(e){return e.is("img")?e:e.find("img")}},proto:{initZoom:function(){var e=t.st.zoom,i=".zoom";if(e.enabled&&t.supportsTransition){var n,o,a=e.duration,r=function(t){var i=t.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),n="all "+e.duration/1e3+"s "+e.easing,o={position:"fixed",zIndex:9999,left:0,top:0,"-webkit-backface-visibility":"hidden"},a="transition";return o["-webkit-"+a]=o["-moz-"+a]=o["-o-"+a]=o[a]=n,i.css(o),i},s=function(){t.content.css("visibility","visible")};x("BuildControls"+i,function(){if(t._allowZoom()){if(clearTimeout(n),t.content.css("visibility","hidden"),image=t._getItemToZoom(),!image)return s(),void 0;o=r(image),o.css(t._getOffset()),t.wrap.append(o),n=setTimeout(function(){o.css(t._getOffset(!0)),n=setTimeout(function(){s(),setTimeout(function(){o.remove(),image=o=null,T("ZoomAnimationEnded")},16)},a)},16)}}),x(c+i,function(){if(t._allowZoom()){if(clearTimeout(n),t.st.removalDelay=a,!image){if(image=t._getItemToZoom(),!image)return;o=r(image)}o.css(t._getOffset(!0)),t.wrap.append(o),t.content.css("visibility","hidden"),setTimeout(function(){o.css(t._getOffset())},16)}}),x(l+i,function(){t._allowZoom()&&(s(),o&&o.remove())})}},_allowZoom:function(){return"image"===t.currItem.type},_getItemToZoom:function(){return t.currItem.hasSize?t.currItem.img:!1},_getOffset:function(i){var n;n=i?t.currItem.img:t.st.zoom.opener(t.currItem.el||t.currItem);var o=n.offset(),a=parseInt(n.css("padding-top"),10),r=parseInt(n.css("padding-bottom"),10);o.top-=e(window).scrollTop()-a;var s={width:n.width(),height:(b?n.innerHeight():n[0].offsetHeight)-r-a};return Z()?s["-moz-transform"]=s.transform="translate("+o.left+"px,"+o.top+"px)":(s.left=o.left,s.top=o.top),s}}});var q="iframe",D="//about:blank",K=function(e){if(t.currTemplate[q]){var i=t.currTemplate[q].find("iframe");i.length&&(e||(i[0].src=D),t.isIE8&&i.css("display",e?"block":"none"))}};e.magnificPopup.registerModule(q,{options:{markup:'<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',srcAction:"iframe_src",patterns:{youtube:{index:"youtube.com",id:"v=",src:"//www.youtube.com/embed/%id%?autoplay=1"},vimeo:{index:"vimeo.com/",id:"/",src:"//player.vimeo.com/video/%id%?autoplay=1"},gmaps:{index:"//maps.google.",src:"%id%&output=embed"}}},proto:{initIframe:function(){t.types.push(q),x("BeforeChange",function(e,t,i){t!==i&&(t===q?K():i===q&&K(!0))}),x(l+"."+q,function(){K()})},getIframe:function(i,n){var o=i.src,a=t.st.iframe;e.each(a.patterns,function(){return o.indexOf(this.index)>-1?(this.id&&(o="string"==typeof this.id?o.substr(o.lastIndexOf(this.id)+this.id.length,o.length):this.id.call(this,o)),o=this.src.replace("%id%",o),!1):void 0});var r={};return a.srcAction&&(r[a.srcAction]=o),t._parseMarkup(n,r,i),t.updateStatus("ready"),n}}});var Y=function(e){var i=t.items.length;return e>i-1?e-i:0>e?i+e:e},U=function(e,t,i){return e.replace("%curr%",t+1).replace("%total%",i)};e.magnificPopup.registerModule("gallery",{options:{enabled:!1,arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',preload:[0,2],navigateByImgClick:!0,arrows:!0,tPrev:"Previous (Left arrow key)",tNext:"Next (Right arrow key)",tCounter:"%curr% of %total%"},proto:{initGallery:function(){var i=t.st.gallery,n=".mfp-gallery",a=Boolean(e.fn.mfpFastClick);return t.direction=!0,i&&i.enabled?(r+=" mfp-gallery",x(f+n,function(){i.navigateByImgClick&&t.wrap.on("click"+n,".mfp-img",function(){return t.items.length>1?(t.next(),!1):void 0}),o.on("keydown"+n,function(e){37===e.keyCode?t.prev():39===e.keyCode&&t.next()})}),x("UpdateStatus"+n,function(e,i){i.text&&(i.text=U(i.text,t.currItem.index,t.items.length))}),x(p+n,function(e,n,o,a){var r=t.items.length;o.counter=r>1?U(i.tCounter,a.index,r):""}),x("BuildControls"+n,function(){if(t.items.length>1&&i.arrows&&!t.arrowLeft){var n=i.arrowMarkup,o=t.arrowLeft=e(n.replace("%title%",i.tPrev).replace("%dir%","left")).addClass(y),r=t.arrowRight=e(n.replace("%title%",i.tNext).replace("%dir%","right")).addClass(y),s=a?"mfpFastClick":"click";o[s](function(){t.prev()}),r[s](function(){t.next()}),t.isIE7&&(k("b",o[0],!1,!0),k("a",o[0],!1,!0),k("b",r[0],!1,!0),k("a",r[0],!1,!0)),t.container.append(o.add(r))}}),x(m+n,function(){t._preloadTimeout&&clearTimeout(t._preloadTimeout),t._preloadTimeout=setTimeout(function(){t.preloadNearbyImages(),t._preloadTimeout=null},16)}),x(l+n,function(){o.off(n),t.wrap.off("click"+n),t.arrowLeft&&a&&t.arrowLeft.add(t.arrowRight).destroyMfpFastClick(),t.arrowRight=t.arrowLeft=null}),void 0):!1},next:function(){t.direction=!0,t.index=Y(t.index+1),t.updateItemHTML()},prev:function(){t.direction=!1,t.index=Y(t.index-1),t.updateItemHTML()},goTo:function(e){t.direction=e>=t.index,t.index=e,t.updateItemHTML()},preloadNearbyImages:function(){var e,i=t.st.gallery.preload,n=Math.min(i[0],t.items.length),o=Math.min(i[1],t.items.length);for(e=1;(t.direction?o:n)>=e;e++)t._preloadItem(t.index+e);for(e=1;(t.direction?n:o)>=e;e++)t._preloadItem(t.index-e)},_preloadItem:function(i){if(i=Y(i),!t.items[i].preloaded){var n=t.items[i];n.parsed||(n=t.parseEl(i)),T("LazyLoad",n),"image"===n.type&&(n.img=e('<img class="mfp-img" />').on("load.mfploader",function(){n.hasSize=!0}).on("error.mfploader",function(){n.hasSize=!0,n.loadError=!0,T("LazyLoadError",n)}).attr("src",n.src)),n.preloaded=!0}}}});var G="retina";e.magnificPopup.registerModule(G,{options:{replaceSrc:function(e){return e.src.replace(/\.\w+$/,function(e){return"@2x"+e})},ratio:1},proto:{initRetina:function(){if(window.devicePixelRatio>1){var e=t.st.retina,i=e.ratio;i=isNaN(i)?i():i,i>1&&(x("ImageHasSize."+G,function(e,t){t.img.css({"max-width":t.img[0].naturalWidth/i,width:"100%"})}),x("ElementParse."+G,function(t,n){n.src=e.replaceSrc(n,i)}))}}}}),function(){var t=1e3,i="ontouchstart"in window,n=function(){I.off("touchmove"+a+" touchend"+a)},o="mfpFastClick",a="."+o;e.fn.mfpFastClick=function(o){return e(this).each(function(){var r,s=e(this);if(i){var l,c,d,u,p,f;s.on("touchstart"+a,function(e){u=!1,f=1,p=e.originalEvent?e.originalEvent.touches[0]:e.touches[0],c=p.clientX,d=p.clientY,I.on("touchmove"+a,function(e){p=e.originalEvent?e.originalEvent.touches:e.touches,f=p.length,p=p[0],(Math.abs(p.clientX-c)>10||Math.abs(p.clientY-d)>10)&&(u=!0,n())}).on("touchend"+a,function(e){n(),u||f>1||(r=!0,e.preventDefault(),clearTimeout(l),l=setTimeout(function(){r=!1},t),o())})})}s.on("click"+a,function(){r||o()})})},e.fn.destroyMfpFastClick=function(){e(this).off("touchstart"+a+" click"+a),i&&I.off("touchmove"+a+" touchend"+a)}}()})(window.jQuery||window.Zepto);

(function( $ ){

  "use strict";

  $.fn.fitVids = function( options ) {
    var settings = {
      customSelector: null
    };

    if(!document.getElementById('fit-vids-style')) {

      var div = document.createElement('div'),
          ref = document.getElementsByTagName('base')[0] || document.getElementsByTagName('script')[0],
          cssStyles = '&shy;<style>.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}</style>';

      div.className = 'fit-vids-style';
      div.id = 'fit-vids-style';
      div.style.display = 'none';
      div.innerHTML = cssStyles;

      ref.parentNode.insertBefore(div,ref);

    }

    if ( options ) {
      $.extend( settings, options );
    }

    return this.each(function(){
      var selectors = [
        "iframe[src*='player.vimeo.com']",
        "iframe[src*='youtube.com']",
        "iframe[src*='youtube-nocookie.com']",
        "iframe[src*='kickstarter.com'][src*='video.html']",
        "object",
        "embed"
      ];

      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }

      var $allVideos = $(this).find(selectors.join(','));
      $allVideos = $allVideos.not("object object"); // SwfObj conflict patch

      $allVideos.each(function(){
        var $this = $(this);
        if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
        var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
            width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
            aspectRatio = height / width;
        if(!$this.attr('id')){
          var videoID = 'fitvid' + Math.floor(Math.random()*999999);
          $this.attr('id', videoID);
        }
        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+"%");
        $this.removeAttr('height').removeAttr('width');
      });
    });
  };
// Works with either jQuery or Zepto
})( window.jQuery || window.Zepto );

/*!
* jquery.counterup.js 1.0
*
* Copyright 2013, Benjamin Intal http://gambit.ph @bfintal
* Released under the GPL v2 License
*
* Date: Nov 26, 2013
*/(function(e){"use strict";e.fn.counterUp=function(t){var n=e.extend({time:400,delay:10},t);return this.each(function(){var t=e(this),r=n,i=function(){var e=[],n=r.time/r.delay,i=t.text(),s=/[0-9]+,[0-9]+/.test(i);i=i.replace(/,/g,"");var o=/^[0-9]+$/.test(i),u=/^[0-9]+\.[0-9]+$/.test(i),a=u?(i.split(".")[1]||[]).length:0;for(var f=n;f>=1;f--){var l=parseInt(i/n*f);u&&(l=parseFloat(i/n*f).toFixed(a));if(s)while(/(\d+)(\d{3})/.test(l.toString()))l=l.toString().replace(/(\d+)(\d{3})/,"$1,$2");e.unshift(l)}t.data("counterup-nums",e);t.text("0");var c=function(){t.text(t.data("counterup-nums").shift());if(t.data("counterup-nums").length)setTimeout(t.data("counterup-func"),r.delay);else{delete t.data("counterup-nums");t.data("counterup-nums",null);t.data("counterup-func",null)}};t.data("counterup-func",c);setTimeout(t.data("counterup-func"),r.delay)};t.waypoint(i,{offset:"100%",triggerOnce:!0})})}})(jQuery);


/**
 * Isotope v1.5.25
 * An exquisite jQuery plugin for magical layouts
 * http://isotope.metafizzy.co
 *
 * Commercial use requires one-time purchase of a commercial license
 * http://isotope.metafizzy.co/docs/license.html
 *
 * Non-commercial use is licensed under the MIT License
 *
 * Copyright 2013 Metafizzy
 */
(function(a,b,c){"use strict";var d=a.document,e=a.Modernizr,f=function(a){return a.charAt(0).toUpperCase()+a.slice(1)},g="Moz Webkit O Ms".split(" "),h=function(a){var b=d.documentElement.style,c;if(typeof b[a]=="string")return a;a=f(a);for(var e=0,h=g.length;e<h;e++){c=g[e]+a;if(typeof b[c]=="string")return c}},i=h("transform"),j=h("transitionProperty"),k={csstransforms:function(){return!!i},csstransforms3d:function(){var a=!!h("perspective");if(a){var c=" -o- -moz- -ms- -webkit- -khtml- ".split(" "),d="@media ("+c.join("transform-3d),(")+"modernizr)",e=b("<style>"+d+"{#modernizr{height:3px}}"+"</style>").appendTo("head"),f=b('<div id="modernizr" />').appendTo("html");a=f.height()===3,f.remove(),e.remove()}return a},csstransitions:function(){return!!j}},l;if(e)for(l in k)e.hasOwnProperty(l)||e.addTest(l,k[l]);else{e=a.Modernizr={_version:"1.6ish: miniModernizr for Isotope"};var m=" ",n;for(l in k)n=k[l](),e[l]=n,m+=" "+(n?"":"no-")+l;b("html").addClass(m)}if(e.csstransforms){var o=e.csstransforms3d?{translate:function(a){return"translate3d("+a[0]+"px, "+a[1]+"px, 0) "},scale:function(a){return"scale3d("+a+", "+a+", 1) "}}:{translate:function(a){return"translate("+a[0]+"px, "+a[1]+"px) "},scale:function(a){return"scale("+a+") "}},p=function(a,c,d){var e=b.data(a,"isoTransform")||{},f={},g,h={},j;f[c]=d,b.extend(e,f);for(g in e)j=e[g],h[g]=o[g](j);var k=h.translate||"",l=h.scale||"",m=k+l;b.data(a,"isoTransform",e),a.style[i]=m};b.cssNumber.scale=!0,b.cssHooks.scale={set:function(a,b){p(a,"scale",b)},get:function(a,c){var d=b.data(a,"isoTransform");return d&&d.scale?d.scale:1}},b.fx.step.scale=function(a){b.cssHooks.scale.set(a.elem,a.now+a.unit)},b.cssNumber.translate=!0,b.cssHooks.translate={set:function(a,b){p(a,"translate",b)},get:function(a,c){var d=b.data(a,"isoTransform");return d&&d.translate?d.translate:[0,0]}}}var q,r;e.csstransitions&&(q={WebkitTransitionProperty:"webkitTransitionEnd",MozTransitionProperty:"transitionend",OTransitionProperty:"oTransitionEnd otransitionend",transitionProperty:"transitionend"}[j],r=h("transitionDuration"));var s=b.event,t=b.event.handle?"handle":"dispatch",u;s.special.smartresize={setup:function(){b(this).bind("resize",s.special.smartresize.handler)},teardown:function(){b(this).unbind("resize",s.special.smartresize.handler)},handler:function(a,b){var c=this,d=arguments;a.type="smartresize",u&&clearTimeout(u),u=setTimeout(function(){s[t].apply(c,d)},b==="execAsap"?0:100)}},b.fn.smartresize=function(a){return a?this.bind("smartresize",a):this.trigger("smartresize",["execAsap"])},b.Isotope=function(a,c,d){this.element=b(c),this._create(a),this._init(d)};var v=["width","height"],w=b(a);b.Isotope.settings={resizable:!0,layoutMode:"masonry",containerClass:"isotope",itemClass:"isotope-item",hiddenClass:"isotope-hidden",hiddenStyle:{opacity:0,scale:.001},visibleStyle:{opacity:1,scale:1},containerStyle:{position:"relative",overflow:"hidden"},animationEngine:"best-available",animationOptions:{queue:!1,duration:800},sortBy:"original-order",sortAscending:!0,resizesContainer:!0,transformsEnabled:!0,itemPositionDataEnabled:!1},b.Isotope.prototype={_create:function(a){this.options=b.extend({},b.Isotope.settings,a),this.styleQueue=[],this.elemCount=0;var c=this.element[0].style;this.originalStyle={};var d=v.slice(0);for(var e in this.options.containerStyle)d.push(e);for(var f=0,g=d.length;f<g;f++)e=d[f],this.originalStyle[e]=c[e]||"";this.element.css(this.options.containerStyle),this._updateAnimationEngine(),this._updateUsingTransforms();var h={"original-order":function(a,b){return b.elemCount++,b.elemCount},random:function(){return Math.random()}};this.options.getSortData=b.extend(this.options.getSortData,h),this.reloadItems(),this.offset={left:parseInt(this.element.css("padding-left")||0,10),top:parseInt(this.element.css("padding-top")||0,10)};var i=this;setTimeout(function(){i.element.addClass(i.options.containerClass)},0),this.options.resizable&&w.bind("smartresize.isotope",function(){i.resize()}),this.element.delegate("."+this.options.hiddenClass,"click",function(){return!1})},_getAtoms:function(a){var b=this.options.itemSelector,c=b?a.filter(b).add(a.find(b)):a,d={position:"absolute"};return c=c.filter(function(a,b){return b.nodeType===1}),this.usingTransforms&&(d.left=0,d.top=0),c.css(d).addClass(this.options.itemClass),this.updateSortData(c,!0),c},_init:function(a){this.$filteredAtoms=this._filter(this.$allAtoms),this._sort(),this.reLayout(a)},option:function(a){if(b.isPlainObject(a)){this.options=b.extend(!0,this.options,a);var c;for(var d in a)c="_update"+f(d),this[c]&&this[c]()}},_updateAnimationEngine:function(){var a=this.options.animationEngine.toLowerCase().replace(/[ _\-]/g,""),b;switch(a){case"css":case"none":b=!1;break;case"jquery":b=!0;break;default:b=!e.csstransitions}this.isUsingJQueryAnimation=b,this._updateUsingTransforms()},_updateTransformsEnabled:function(){this._updateUsingTransforms()},_updateUsingTransforms:function(){var a=this.usingTransforms=this.options.transformsEnabled&&e.csstransforms&&e.csstransitions&&!this.isUsingJQueryAnimation;a||(delete this.options.hiddenStyle.scale,delete this.options.visibleStyle.scale),this.getPositionStyles=a?this._translate:this._positionAbs},_filter:function(a){var b=this.options.filter===""?"*":this.options.filter;if(!b)return a;var c=this.options.hiddenClass,d="."+c,e=a.filter(d),f=e;if(b!=="*"){f=e.filter(b);var g=a.not(d).not(b).addClass(c);this.styleQueue.push({$el:g,style:this.options.hiddenStyle})}return this.styleQueue.push({$el:f,style:this.options.visibleStyle}),f.removeClass(c),a.filter(b)},updateSortData:function(a,c){var d=this,e=this.options.getSortData,f,g;a.each(function(){f=b(this),g={};for(var a in e)!c&&a==="original-order"?g[a]=b.data(this,"isotope-sort-data")[a]:g[a]=e[a](f,d);b.data(this,"isotope-sort-data",g)})},_sort:function(){var a=this.options.sortBy,b=this._getSorter,c=this.options.sortAscending?1:-1,d=function(d,e){var f=b(d,a),g=b(e,a);return f===g&&a!=="original-order"&&(f=b(d,"original-order"),g=b(e,"original-order")),(f>g?1:f<g?-1:0)*c};this.$filteredAtoms.sort(d)},_getSorter:function(a,c){return b.data(a,"isotope-sort-data")[c]},_translate:function(a,b){return{translate:[a,b]}},_positionAbs:function(a,b){return{left:a,top:b}},_pushPosition:function(a,b,c){b=Math.round(b+this.offset.left),c=Math.round(c+this.offset.top);var d=this.getPositionStyles(b,c);this.styleQueue.push({$el:a,style:d}),this.options.itemPositionDataEnabled&&a.data("isotope-item-position",{x:b,y:c})},layout:function(a,b){var c=this.options.layoutMode;this["_"+c+"Layout"](a);if(this.options.resizesContainer){var d=this["_"+c+"GetContainerSize"]();this.styleQueue.push({$el:this.element,style:d})}this._processStyleQueue(a,b),this.isLaidOut=!0},_processStyleQueue:function(a,c){var d=this.isLaidOut?this.isUsingJQueryAnimation?"animate":"css":"css",f=this.options.animationOptions,g=this.options.onLayout,h,i,j,k;i=function(a,b){b.$el[d](b.style,f)};if(this._isInserting&&this.isUsingJQueryAnimation)i=function(a,b){h=b.$el.hasClass("no-transition")?"css":d,b.$el[h](b.style,f)};else if(c||g||f.complete){var l=!1,m=[c,g,f.complete],n=this;j=!0,k=function(){if(l)return;var b;for(var c=0,d=m.length;c<d;c++)b=m[c],typeof b=="function"&&b.call(n.element,a,n);l=!0};if(this.isUsingJQueryAnimation&&d==="animate")f.complete=k,j=!1;else if(e.csstransitions){var o=0,p=this.styleQueue[0],s=p&&p.$el,t;while(!s||!s.length){t=this.styleQueue[o++];if(!t)return;s=t.$el}var u=parseFloat(getComputedStyle(s[0])[r]);u>0&&(i=function(a,b){b.$el[d](b.style,f).one(q,k)},j=!1)}}b.each(this.styleQueue,i),j&&k(),this.styleQueue=[]},resize:function(){this["_"+this.options.layoutMode+"ResizeChanged"]()&&this.reLayout()},reLayout:function(a){this["_"+this.options.layoutMode+"Reset"](),this.layout(this.$filteredAtoms,a)},addItems:function(a,b){var c=this._getAtoms(a);this.$allAtoms=this.$allAtoms.add(c),b&&b(c)},insert:function(a,b){this.element.append(a);var c=this;this.addItems(a,function(a){var d=c._filter(a);c._addHideAppended(d),c._sort(),c.reLayout(),c._revealAppended(d,b)})},appended:function(a,b){var c=this;this.addItems(a,function(a){c._addHideAppended(a),c.layout(a),c._revealAppended(a,b)})},_addHideAppended:function(a){this.$filteredAtoms=this.$filteredAtoms.add(a),a.addClass("no-transition"),this._isInserting=!0,this.styleQueue.push({$el:a,style:this.options.hiddenStyle})},_revealAppended:function(a,b){var c=this;setTimeout(function(){a.removeClass("no-transition"),c.styleQueue.push({$el:a,style:c.options.visibleStyle}),c._isInserting=!1,c._processStyleQueue(a,b)},10)},reloadItems:function(){this.$allAtoms=this._getAtoms(this.element.children())},remove:function(a,b){this.$allAtoms=this.$allAtoms.not(a),this.$filteredAtoms=this.$filteredAtoms.not(a);var c=this,d=function(){a.remove(),b&&b.call(c.element)};a.filter(":not(."+this.options.hiddenClass+")").length?(this.styleQueue.push({$el:a,style:this.options.hiddenStyle}),this._sort(),this.reLayout(d)):d()},shuffle:function(a){this.updateSortData(this.$allAtoms),this.options.sortBy="random",this._sort(),this.reLayout(a)},destroy:function(){var a=this.usingTransforms,b=this.options;this.$allAtoms.removeClass(b.hiddenClass+" "+b.itemClass).each(function(){var b=this.style;b.position="",b.top="",b.left="",b.opacity="",a&&(b[i]="")});var c=this.element[0].style;for(var d in this.originalStyle)c[d]=this.originalStyle[d];this.element.unbind(".isotope").undelegate("."+b.hiddenClass,"click").removeClass(b.containerClass).removeData("isotope"),w.unbind(".isotope")},_getSegments:function(a){var b=this.options.layoutMode,c=a?"rowHeight":"columnWidth",d=a?"height":"width",e=a?"rows":"cols",g=this.element[d](),h,i=this.options[b]&&this.options[b][c]||this.$filteredAtoms["outer"+f(d)](!0)||g;h=Math.floor(g/i),h=Math.max(h,1),this[b][e]=h,this[b][c]=i},_checkIfSegmentsChanged:function(a){var b=this.options.layoutMode,c=a?"rows":"cols",d=this[b][c];return this._getSegments(a),this[b][c]!==d},_masonryReset:function(){this.masonry={},this._getSegments();var a=this.masonry.cols;this.masonry.colYs=[];while(a--)this.masonry.colYs.push(0)},_masonryLayout:function(a){var c=this,d=c.masonry;a.each(function(){var a=b(this),e=Math.ceil(a.outerWidth(!0)/d.columnWidth);e=Math.min(e,d.cols);if(e===1)c._masonryPlaceBrick(a,d.colYs);else{var f=d.cols+1-e,g=[],h,i;for(i=0;i<f;i++)h=d.colYs.slice(i,i+e),g[i]=Math.max.apply(Math,h);c._masonryPlaceBrick(a,g)}})},_masonryPlaceBrick:function(a,b){var c=Math.min.apply(Math,b),d=0;for(var e=0,f=b.length;e<f;e++)if(b[e]===c){d=e;break}var g=this.masonry.columnWidth*d,h=c;this._pushPosition(a,g,h);var i=c+a.outerHeight(!0),j=this.masonry.cols+1-f;for(e=0;e<j;e++)this.masonry.colYs[d+e]=i},_masonryGetContainerSize:function(){var a=Math.max.apply(Math,this.masonry.colYs);return{height:a}},_masonryResizeChanged:function(){return this._checkIfSegmentsChanged()},_fitRowsReset:function(){this.fitRows={x:0,y:0,height:0}},_fitRowsLayout:function(a){var c=this,d=this.element.width(),e=this.fitRows;a.each(function(){var a=b(this),f=a.outerWidth(!0),g=a.outerHeight(!0);e.x!==0&&f+e.x>d&&(e.x=0,e.y=e.height),c._pushPosition(a,e.x,e.y),e.height=Math.max(e.y+g,e.height),e.x+=f})},_fitRowsGetContainerSize:function(){return{height:this.fitRows.height}},_fitRowsResizeChanged:function(){return!0},_cellsByRowReset:function(){this.cellsByRow={index:0},this._getSegments(),this._getSegments(!0)},_cellsByRowLayout:function(a){var c=this,d=this.cellsByRow;a.each(function(){var a=b(this),e=d.index%d.cols,f=Math.floor(d.index/d.cols),g=(e+.5)*d.columnWidth-a.outerWidth(!0)/2,h=(f+.5)*d.rowHeight-a.outerHeight(!0)/2;c._pushPosition(a,g,h),d.index++})},_cellsByRowGetContainerSize:function(){return{height:Math.ceil(this.$filteredAtoms.length/this.cellsByRow.cols)*this.cellsByRow.rowHeight+this.offset.top}},_cellsByRowResizeChanged:function(){return this._checkIfSegmentsChanged()},_straightDownReset:function(){this.straightDown={y:0}},_straightDownLayout:function(a){var c=this;a.each(function(a){var d=b(this);c._pushPosition(d,0,c.straightDown.y),c.straightDown.y+=d.outerHeight(!0)})},_straightDownGetContainerSize:function(){return{height:this.straightDown.y}},_straightDownResizeChanged:function(){return!0},_masonryHorizontalReset:function(){this.masonryHorizontal={},this._getSegments(!0);var a=this.masonryHorizontal.rows;this.masonryHorizontal.rowXs=[];while(a--)this.masonryHorizontal.rowXs.push(0)},_masonryHorizontalLayout:function(a){var c=this,d=c.masonryHorizontal;a.each(function(){var a=b(this),e=Math.ceil(a.outerHeight(!0)/d.rowHeight);e=Math.min(e,d.rows);if(e===1)c._masonryHorizontalPlaceBrick(a,d.rowXs);else{var f=d.rows+1-e,g=[],h,i;for(i=0;i<f;i++)h=d.rowXs.slice(i,i+e),g[i]=Math.max.apply(Math,h);c._masonryHorizontalPlaceBrick(a,g)}})},_masonryHorizontalPlaceBrick:function(a,b){var c=Math.min.apply(Math,b),d=0;for(var e=0,f=b.length;e<f;e++)if(b[e]===c){d=e;break}var g=c,h=this.masonryHorizontal.rowHeight*d;this._pushPosition(a,g,h);var i=c+a.outerWidth(!0),j=this.masonryHorizontal.rows+1-f;for(e=0;e<j;e++)this.masonryHorizontal.rowXs[d+e]=i},_masonryHorizontalGetContainerSize:function(){var a=Math.max.apply(Math,this.masonryHorizontal.rowXs);return{width:a}},_masonryHorizontalResizeChanged:function(){return this._checkIfSegmentsChanged(!0)},_fitColumnsReset:function(){this.fitColumns={x:0,y:0,width:0}},_fitColumnsLayout:function(a){var c=this,d=this.element.height(),e=this.fitColumns;a.each(function(){var a=b(this),f=a.outerWidth(!0),g=a.outerHeight(!0);e.y!==0&&g+e.y>d&&(e.x=e.width,e.y=0),c._pushPosition(a,e.x,e.y),e.width=Math.max(e.x+f,e.width),e.y+=g})},_fitColumnsGetContainerSize:function(){return{width:this.fitColumns.width}},_fitColumnsResizeChanged:function(){return!0},_cellsByColumnReset:function(){this.cellsByColumn={index:0},this._getSegments(),this._getSegments(!0)},_cellsByColumnLayout:function(a){var c=this,d=this.cellsByColumn;a.each(function(){var a=b(this),e=Math.floor(d.index/d.rows),f=d.index%d.rows,g=(e+.5)*d.columnWidth-a.outerWidth(!0)/2,h=(f+.5)*d.rowHeight-a.outerHeight(!0)/2;c._pushPosition(a,g,h),d.index++})},_cellsByColumnGetContainerSize:function(){return{width:Math.ceil(this.$filteredAtoms.length/this.cellsByColumn.rows)*this.cellsByColumn.columnWidth}},_cellsByColumnResizeChanged:function(){return this._checkIfSegmentsChanged(!0)},_straightAcrossReset:function(){this.straightAcross={x:0}},_straightAcrossLayout:function(a){var c=this;a.each(function(a){var d=b(this);c._pushPosition(d,c.straightAcross.x,0),c.straightAcross.x+=d.outerWidth(!0)})},_straightAcrossGetContainerSize:function(){return{width:this.straightAcross.x}},_straightAcrossResizeChanged:function(){return!0}},b.fn.imagesLoaded=function(a){function h(){a.call(c,d)}function i(a){var c=a.target;c.src!==f&&b.inArray(c,g)===-1&&(g.push(c),--e<=0&&(setTimeout(h),d.unbind(".imagesLoaded",i)))}var c=this,d=c.find("img").add(c.filter("img")),e=d.length,f="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",g=[];return e||h(),d.bind("load.imagesLoaded error.imagesLoaded",i).each(function(){var a=this.src;this.src=f,this.src=a}),c};var x=function(b){a.console&&a.console.error(b)};b.fn.isotope=function(a,c){if(typeof a=="string"){var d=Array.prototype.slice.call(arguments,1);this.each(function(){var c=b.data(this,"isotope");if(!c){x("cannot call methods on isotope prior to initialization; attempted to call method '"+a+"'");return}if(!b.isFunction(c[a])||a.charAt(0)==="_"){x("no such method '"+a+"' for isotope instance");return}c[a].apply(c,d)})}else this.each(function(){var d=b.data(this,"isotope");d?(d.option(a),d._init(c)):b.data(this,"isotope",new b.Isotope(a,this,c))});return this}})(window,jQuery);

/*
 * jQuery validation plug-in 1.7
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright (c) 2006 - 2008 J??rn Zaefferer
 *
 * $Id: jquery.validate.js 6403 2009-06-17 14:27:16Z joern.zaefferer $
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(7($){$.H($.2L,{17:7(d){l(!6.F){d&&d.2q&&2T.1z&&1z.52("3y 3p, 4L\'t 17, 64 3y");8}p c=$.19(6[0],\'v\');l(c){8 c}c=2w $.v(d,6[0]);$.19(6[0],\'v\',c);l(c.q.3x){6.3s("1w, 3i").1o(".4E").3e(7(){c.3b=w});l(c.q.35){6.3s("1w, 3i").1o(":2s").3e(7(){c.1Z=6})}6.2s(7(b){l(c.q.2q)b.5J();7 1T(){l(c.q.35){l(c.1Z){p a=$("<1w 1V=\'5r\'/>").1s("u",c.1Z.u).33(c.1Z.Z).51(c.U)}c.q.35.V(c,c.U);l(c.1Z){a.3D()}8 N}8 w}l(c.3b){c.3b=N;8 1T()}l(c.L()){l(c.1b){c.1l=w;8 N}8 1T()}12{c.2l();8 N}})}8 c},J:7(){l($(6[0]).2W(\'L\')){8 6.17().L()}12{p b=w;p a=$(6[0].L).17();6.P(7(){b&=a.I(6)});8 b}},4D:7(c){p d={},$I=6;$.P(c.1I(/\\s/),7(a,b){d[b]=$I.1s(b);$I.6d(b)});8 d},1i:7(h,k){p f=6[0];l(h){p i=$.19(f.L,\'v\').q;p d=i.1i;p c=$.v.36(f);23(h){1e"1d":$.H(c,$.v.1X(k));d[f.u]=c;l(k.G)i.G[f.u]=$.H(i.G[f.u],k.G);31;1e"3D":l(!k){T d[f.u];8 c}p e={};$.P(k.1I(/\\s/),7(a,b){e[b]=c[b];T c[b]});8 e}}p g=$.v.41($.H({},$.v.3Y(f),$.v.3V(f),$.v.3T(f),$.v.36(f)),f);l(g.15){p j=g.15;T g.15;g=$.H({15:j},g)}8 g}});$.H($.5p[":"],{5n:7(a){8!$.1p(""+a.Z)},5g:7(a){8!!$.1p(""+a.Z)},5f:7(a){8!a.4h}});$.v=7(b,a){6.q=$.H(w,{},$.v.3d,b);6.U=a;6.3I()};$.v.W=7(c,b){l(R.F==1)8 7(){p a=$.3F(R);a.4V(c);8 $.v.W.1Q(6,a)};l(R.F>2&&b.2c!=3B){b=$.3F(R).4Q(1)}l(b.2c!=3B){b=[b]}$.P(b,7(i,n){c=c.1u(2w 3t("\\\\{"+i+"\\\\}","g"),n)});8 c};$.H($.v,{3d:{G:{},2a:{},1i:{},1c:"3r",28:"J",2F:"4P",2l:w,3o:$([]),2D:$([]),3x:w,3l:[],3k:N,4O:7(a){6.3U=a;l(6.q.4K&&!6.4J){6.q.1K&&6.q.1K.V(6,a,6.q.1c,6.q.28);6.1M(a).2A()}},4C:7(a){l(!6.1E(a)&&(a.u 11 6.1a||!6.K(a))){6.I(a)}},6c:7(a){l(a.u 11 6.1a||a==6.4A){6.I(a)}},68:7(a){l(a.u 11 6.1a)6.I(a);12 l(a.4x.u 11 6.1a)6.I(a.4x)},39:7(a,c,b){$(a).22(c).2v(b)},1K:7(a,c,b){$(a).2v(c).22(b)}},63:7(a){$.H($.v.3d,a)},G:{15:"61 4r 2W 15.",1q:"M 2O 6 4r.",1J:"M O a J 1J 5X.",1B:"M O a J 5W.",1A:"M O a J 1A.",2j:"M O a J 1A (5Q).",1G:"M O a J 1G.",1P:"M O 5O 1P.",2f:"M O a J 5L 5I 1G.",2o:"M O 47 5F Z 5B.",43:"M O a Z 5z a J 5x.",18:$.v.W("M O 3K 5v 2X {0} 2V."),1y:$.v.W("M O 5t 5s {0} 2V."),2i:$.v.W("M O a Z 3W {0} 3O {1} 2V 5o."),2r:$.v.W("M O a Z 3W {0} 3O {1}."),1C:$.v.W("M O a Z 5j 2X 46 3M 3L {0}."),1t:$.v.W("M O a Z 5d 2X 46 3M 3L {0}.")},3J:N,5a:{3I:7(){6.24=$(6.q.2D);6.4t=6.24.F&&6.24||$(6.U);6.2x=$(6.q.3o).1d(6.q.2D);6.1a={};6.54={};6.1b=0;6.1h={};6.1f={};6.21();p f=(6.2a={});$.P(6.q.2a,7(d,c){$.P(c.1I(/\\s/),7(a,b){f[b]=d})});p e=6.q.1i;$.P(e,7(b,a){e[b]=$.v.1X(a)});7 2N(a){p b=$.19(6[0].L,"v"),3c="4W"+a.1V.1u(/^17/,"");b.q[3c]&&b.q[3c].V(b,6[0])}$(6.U).2K(":3E, :4U, :4T, 2e, 4S","2d 2J 4R",2N).2K(":3C, :3A, 2e, 3z","3e",2N);l(6.q.3w)$(6.U).2I("1f-L.17",6.q.3w)},L:7(){6.3v();$.H(6.1a,6.1v);6.1f=$.H({},6.1v);l(!6.J())$(6.U).3u("1f-L",[6]);6.1m();8 6.J()},3v:7(){6.2H();Q(p i=0,14=(6.2b=6.14());14[i];i++){6.29(14[i])}8 6.J()},I:7(a){a=6.2G(a);6.4A=a;6.2P(a);6.2b=$(a);p b=6.29(a);l(b){T 6.1f[a.u]}12{6.1f[a.u]=w}l(!6.3q()){6.13=6.13.1d(6.2x)}6.1m();8 b},1m:7(b){l(b){$.H(6.1v,b);6.S=[];Q(p c 11 b){6.S.27({1j:b[c],I:6.26(c)[0]})}6.1n=$.3n(6.1n,7(a){8!(a.u 11 b)})}6.q.1m?6.q.1m.V(6,6.1v,6.S):6.3m()},2S:7(){l($.2L.2S)$(6.U).2S();6.1a={};6.2H();6.2Q();6.14().2v(6.q.1c)},3q:7(){8 6.2k(6.1f)},2k:7(a){p b=0;Q(p i 11 a)b++;8 b},2Q:7(){6.2C(6.13).2A()},J:7(){8 6.3j()==0},3j:7(){8 6.S.F},2l:7(){l(6.q.2l){3Q{$(6.3h()||6.S.F&&6.S[0].I||[]).1o(":4N").3g().4M("2d")}3f(e){}}},3h:7(){p a=6.3U;8 a&&$.3n(6.S,7(n){8 n.I.u==a.u}).F==1&&a},14:7(){p a=6,2B={};8 $([]).1d(6.U.14).1o(":1w").1L(":2s, :21, :4I, [4H]").1L(6.q.3l).1o(7(){!6.u&&a.q.2q&&2T.1z&&1z.3r("%o 4G 3K u 4F",6);l(6.u 11 2B||!a.2k($(6).1i()))8 N;2B[6.u]=w;8 w})},2G:7(a){8 $(a)[0]},2z:7(){8 $(6.q.2F+"."+6.q.1c,6.4t)},21:7(){6.1n=[];6.S=[];6.1v={};6.1k=$([]);6.13=$([]);6.2b=$([])},2H:7(){6.21();6.13=6.2z().1d(6.2x)},2P:7(a){6.21();6.13=6.1M(a)},29:7(d){d=6.2G(d);l(6.1E(d)){d=6.26(d.u)[0]}p a=$(d).1i();p c=N;Q(Y 11 a){p b={Y:Y,2n:a[Y]};3Q{p f=$.v.1N[Y].V(6,d.Z.1u(/\\r/g,""),d,b.2n);l(f=="1S-1Y"){c=w;6g}c=N;l(f=="1h"){6.13=6.13.1L(6.1M(d));8}l(!f){6.4B(d,b);8 N}}3f(e){6.q.2q&&2T.1z&&1z.6f("6e 6b 6a 69 I "+d.4z+", 29 47 \'"+b.Y+"\' Y",e);67 e;}}l(c)8;l(6.2k(a))6.1n.27(d);8 w},4y:7(a,b){l(!$.1H)8;p c=6.q.3a?$(a).1H()[6.q.3a]:$(a).1H();8 c&&c.G&&c.G[b]},4w:7(a,b){p m=6.q.G[a];8 m&&(m.2c==4v?m:m[b])},4u:7(){Q(p i=0;i<R.F;i++){l(R[i]!==20)8 R[i]}8 20},2u:7(a,b){8 6.4u(6.4w(a.u,b),6.4y(a,b),!6.q.3k&&a.62||20,$.v.G[b],"<4s>60: 5Z 1j 5Y Q "+a.u+"</4s>")},4B:7(b,a){p c=6.2u(b,a.Y),37=/\\$?\\{(\\d+)\\}/g;l(1g c=="7"){c=c.V(6,a.2n,b)}12 l(37.16(c)){c=1F.W(c.1u(37,\'{$1}\'),a.2n)}6.S.27({1j:c,I:b});6.1v[b.u]=c;6.1a[b.u]=c},2C:7(a){l(6.q.2t)a=a.1d(a.4q(6.q.2t));8 a},3m:7(){Q(p i=0;6.S[i];i++){p a=6.S[i];6.q.39&&6.q.39.V(6,a.I,6.q.1c,6.q.28);6.2E(a.I,a.1j)}l(6.S.F){6.1k=6.1k.1d(6.2x)}l(6.q.1x){Q(p i=0;6.1n[i];i++){6.2E(6.1n[i])}}l(6.q.1K){Q(p i=0,14=6.4p();14[i];i++){6.q.1K.V(6,14[i],6.q.1c,6.q.28)}}6.13=6.13.1L(6.1k);6.2Q();6.2C(6.1k).4o()},4p:7(){8 6.2b.1L(6.4n())},4n:7(){8 $(6.S).4m(7(){8 6.I})},2E:7(a,c){p b=6.1M(a);l(b.F){b.2v().22(6.q.1c);b.1s("4l")&&b.4k(c)}12{b=$("<"+6.q.2F+"/>").1s({"Q":6.34(a),4l:w}).22(6.q.1c).4k(c||"");l(6.q.2t){b=b.2A().4o().5V("<"+6.q.2t+"/>").4q()}l(!6.24.5S(b).F)6.q.4j?6.q.4j(b,$(a)):b.5R(a)}l(!c&&6.q.1x){b.3E("");1g 6.q.1x=="1D"?b.22(6.q.1x):6.q.1x(b)}6.1k=6.1k.1d(b)},1M:7(a){p b=6.34(a);8 6.2z().1o(7(){8 $(6).1s(\'Q\')==b})},34:7(a){8 6.2a[a.u]||(6.1E(a)?a.u:a.4z||a.u)},1E:7(a){8/3C|3A/i.16(a.1V)},26:7(d){p c=6.U;8 $(4i.5P(d)).4m(7(a,b){8 b.L==c&&b.u==d&&b||4g})},1O:7(a,b){23(b.4f.4e()){1e\'2e\':8 $("3z:3p",b).F;1e\'1w\':l(6.1E(b))8 6.26(b.u).1o(\':4h\').F}8 a.F},4d:7(b,a){8 6.32[1g b]?6.32[1g b](b,a):w},32:{"5N":7(b,a){8 b},"1D":7(b,a){8!!$(b,a.L).F},"7":7(b,a){8 b(a)}},K:7(a){8!$.v.1N.15.V(6,$.1p(a.Z),a)&&"1S-1Y"},4c:7(a){l(!6.1h[a.u]){6.1b++;6.1h[a.u]=w}},4b:7(a,b){6.1b--;l(6.1b<0)6.1b=0;T 6.1h[a.u];l(b&&6.1b==0&&6.1l&&6.L()){$(6.U).2s();6.1l=N}12 l(!b&&6.1b==0&&6.1l){$(6.U).3u("1f-L",[6]);6.1l=N}},2h:7(a){8 $.19(a,"2h")||$.19(a,"2h",{2M:4g,J:w,1j:6.2u(a,"1q")})}},1R:{15:{15:w},1J:{1J:w},1B:{1B:w},1A:{1A:w},2j:{2j:w},4a:{4a:w},1G:{1G:w},49:{49:w},1P:{1P:w},2f:{2f:w}},48:7(a,b){a.2c==4v?6.1R[a]=b:$.H(6.1R,a)},3V:7(b){p a={};p c=$(b).1s(\'5H\');c&&$.P(c.1I(\' \'),7(){l(6 11 $.v.1R){$.H(a,$.v.1R[6])}});8 a},3T:7(c){p a={};p d=$(c);Q(Y 11 $.v.1N){p b=d.1s(Y);l(b){a[Y]=b}}l(a.18&&/-1|5G|5C/.16(a.18)){T a.18}8 a},3Y:7(a){l(!$.1H)8{};p b=$.19(a.L,\'v\').q.3a;8 b?$(a).1H()[b]:$(a).1H()},36:7(b){p a={};p c=$.19(b.L,\'v\');l(c.q.1i){a=$.v.1X(c.q.1i[b.u])||{}}8 a},41:7(d,e){$.P(d,7(c,b){l(b===N){T d[c];8}l(b.2R||b.2p){p a=w;23(1g b.2p){1e"1D":a=!!$(b.2p,e.L).F;31;1e"7":a=b.2p.V(e,e);31}l(a){d[c]=b.2R!==20?b.2R:w}12{T d[c]}}});$.P(d,7(a,b){d[a]=$.44(b)?b(e):b});$.P([\'1y\',\'18\',\'1t\',\'1C\'],7(){l(d[6]){d[6]=2Z(d[6])}});$.P([\'2i\',\'2r\'],7(){l(d[6]){d[6]=[2Z(d[6][0]),2Z(d[6][1])]}});l($.v.3J){l(d.1t&&d.1C){d.2r=[d.1t,d.1C];T d.1t;T d.1C}l(d.1y&&d.18){d.2i=[d.1y,d.18];T d.1y;T d.18}}l(d.G){T d.G}8 d},1X:7(a){l(1g a=="1D"){p b={};$.P(a.1I(/\\s/),7(){b[6]=w});a=b}8 a},5A:7(c,a,b){$.v.1N[c]=a;$.v.G[c]=b!=20?b:$.v.G[c];l(a.F<3){$.v.48(c,$.v.1X(c))}},1N:{15:7(c,d,a){l(!6.4d(a,d))8"1S-1Y";23(d.4f.4e()){1e\'2e\':p b=$(d).33();8 b&&b.F>0;1e\'1w\':l(6.1E(d))8 6.1O(c,d)>0;5y:8 $.1p(c).F>0}},1q:7(f,h,j){l(6.K(h))8"1S-1Y";p g=6.2h(h);l(!6.q.G[h.u])6.q.G[h.u]={};g.40=6.q.G[h.u].1q;6.q.G[h.u].1q=g.1j;j=1g j=="1D"&&{1B:j}||j;l(g.2M!==f){g.2M=f;p k=6;6.4c(h);p i={};i[h.u]=f;$.2U($.H(w,{1B:j,3Z:"2Y",3X:"17"+h.u,5w:"5u",19:i,1x:7(d){k.q.G[h.u].1q=g.40;p b=d===w;l(b){p e=k.1l;k.2P(h);k.1l=e;k.1n.27(h);k.1m()}12{p a={};p c=(g.1j=d||k.2u(h,"1q"));a[h.u]=$.44(c)?c(f):c;k.1m(a)}g.J=b;k.4b(h,b)}},j));8"1h"}12 l(6.1h[h.u]){8"1h"}8 g.J},1y:7(b,c,a){8 6.K(c)||6.1O($.1p(b),c)>=a},18:7(b,c,a){8 6.K(c)||6.1O($.1p(b),c)<=a},2i:7(b,d,a){p c=6.1O($.1p(b),d);8 6.K(d)||(c>=a[0]&&c<=a[1])},1t:7(b,c,a){8 6.K(c)||b>=a},1C:7(b,c,a){8 6.K(c)||b<=a},2r:7(b,c,a){8 6.K(c)||(b>=a[0]&&b<=a[1])},1J:7(a,b){8 6.K(b)||/^((([a-z]|\\d|[!#\\$%&\'\\*\\+\\-\\/=\\?\\^X`{\\|}~]|[\\E-\\B\\C-\\x\\A-\\y])+(\\.([a-z]|\\d|[!#\\$%&\'\\*\\+\\-\\/=\\?\\^X`{\\|}~]|[\\E-\\B\\C-\\x\\A-\\y])+)*)|((\\3S)((((\\2m|\\1W)*(\\30\\3R))?(\\2m|\\1W)+)?(([\\3P-\\5q\\45\\42\\5D-\\5E\\3N]|\\5m|[\\5l-\\5k]|[\\5i-\\5K]|[\\E-\\B\\C-\\x\\A-\\y])|(\\\\([\\3P-\\1W\\45\\42\\30-\\3N]|[\\E-\\B\\C-\\x\\A-\\y]))))*(((\\2m|\\1W)*(\\30\\3R))?(\\2m|\\1W)+)?(\\3S)))@((([a-z]|\\d|[\\E-\\B\\C-\\x\\A-\\y])|(([a-z]|\\d|[\\E-\\B\\C-\\x\\A-\\y])([a-z]|\\d|-|\\.|X|~|[\\E-\\B\\C-\\x\\A-\\y])*([a-z]|\\d|[\\E-\\B\\C-\\x\\A-\\y])))\\.)+(([a-z]|[\\E-\\B\\C-\\x\\A-\\y])|(([a-z]|[\\E-\\B\\C-\\x\\A-\\y])([a-z]|\\d|-|\\.|X|~|[\\E-\\B\\C-\\x\\A-\\y])*([a-z]|[\\E-\\B\\C-\\x\\A-\\y])))\\.?$/i.16(a)},1B:7(a,b){8 6.K(b)||/^(5h?|5M):\\/\\/(((([a-z]|\\d|-|\\.|X|~|[\\E-\\B\\C-\\x\\A-\\y])|(%[\\1U-f]{2})|[!\\$&\'\\(\\)\\*\\+,;=]|:)*@)?(((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]))|((([a-z]|\\d|[\\E-\\B\\C-\\x\\A-\\y])|(([a-z]|\\d|[\\E-\\B\\C-\\x\\A-\\y])([a-z]|\\d|-|\\.|X|~|[\\E-\\B\\C-\\x\\A-\\y])*([a-z]|\\d|[\\E-\\B\\C-\\x\\A-\\y])))\\.)+(([a-z]|[\\E-\\B\\C-\\x\\A-\\y])|(([a-z]|[\\E-\\B\\C-\\x\\A-\\y])([a-z]|\\d|-|\\.|X|~|[\\E-\\B\\C-\\x\\A-\\y])*([a-z]|[\\E-\\B\\C-\\x\\A-\\y])))\\.?)(:\\d*)?)(\\/((([a-z]|\\d|-|\\.|X|~|[\\E-\\B\\C-\\x\\A-\\y])|(%[\\1U-f]{2})|[!\\$&\'\\(\\)\\*\\+,;=]|:|@)+(\\/(([a-z]|\\d|-|\\.|X|~|[\\E-\\B\\C-\\x\\A-\\y])|(%[\\1U-f]{2})|[!\\$&\'\\(\\)\\*\\+,;=]|:|@)*)*)?)?(\\?((([a-z]|\\d|-|\\.|X|~|[\\E-\\B\\C-\\x\\A-\\y])|(%[\\1U-f]{2})|[!\\$&\'\\(\\)\\*\\+,;=]|:|@)|[\\5e-\\5T]|\\/|\\?)*)?(\\#((([a-z]|\\d|-|\\.|X|~|[\\E-\\B\\C-\\x\\A-\\y])|(%[\\1U-f]{2})|[!\\$&\'\\(\\)\\*\\+,;=]|:|@)|\\/|\\?)*)?$/i.16(a)},1A:7(a,b){8 6.K(b)||!/5U|5c/.16(2w 5b(a))},2j:7(a,b){8 6.K(b)||/^\\d{4}[\\/-]\\d{1,2}[\\/-]\\d{1,2}$/.16(a)},1G:7(a,b){8 6.K(b)||/^-?(?:\\d+|\\d{1,3}(?:,\\d{3})+)(?:\\.\\d+)?$/.16(a)},1P:7(a,b){8 6.K(b)||/^\\d+$/.16(a)},2f:7(b,e){l(6.K(e))8"1S-1Y";l(/[^0-9-]+/.16(b))8 N;p a=0,d=0,2g=N;b=b.1u(/\\D/g,"");Q(p n=b.F-1;n>=0;n--){p c=b.59(n);p d=58(c,10);l(2g){l((d*=2)>9)d-=9}a+=d;2g=!2g}8(a%10)==0},43:7(b,c,a){a=1g a=="1D"?a.1u(/,/g,\'|\'):"57|56?g|55";8 6.K(c)||b.65(2w 3t(".("+a+")$","i"))},2o:7(c,d,a){p b=$(a).66(".17-2o").2I("3H.17-2o",7(){$(d).J()});8 c==b.33()}}});$.W=$.v.W})(1F);(7($){p c=$.2U;p d={};$.2U=7(a){a=$.H(a,$.H({},$.53,a));p b=a.3X;l(a.3Z=="2Y"){l(d[b]){d[b].2Y()}8(d[b]=c.1Q(6,R))}8 c.1Q(6,R)}})(1F);(7($){l(!1F.1r.38.2d&&!1F.1r.38.2J&&4i.3G){$.P({3g:\'2d\',3H:\'2J\'},7(b,a){$.1r.38[a]={50:7(){6.3G(b,2y,w)},4Z:7(){6.4Y(b,2y,w)},2y:7(e){R[0]=$.1r.2O(e);R[0].1V=a;8 $.1r.1T.1Q(6,R)}};7 2y(e){e=$.1r.2O(e);e.1V=a;8 $.1r.1T.V(6,e)}})};$.H($.2L,{2K:7(d,e,c){8 6.2I(e,7(a){p b=$(a.4X);l(b.2W(d)){8 c.1Q(b,R)}})}})})(1F);',62,389,'||||||this|function|return|||||||||||||if||||var|settings||||name|validator|true|uFDCF|uFFEF||uFDF0|uD7FF|uF900||u00A0|length|messages|extend|element|valid|optional|form|Please|false|enter|each|for|arguments|errorList|delete|currentForm|call|format|_|method|value||in|else|toHide|elements|required|test|validate|maxlength|data|submitted|pendingRequest|errorClass|add|case|invalid|typeof|pending|rules|message|toShow|formSubmitted|showErrors|successList|filter|trim|remote|event|attr|min|replace|errorMap|input|success|minlength|console|date|url|max|string|checkable|jQuery|number|metadata|split|email|unhighlight|not|errorsFor|methods|getLength|digits|apply|classRuleSettings|dependency|handle|da|type|x09|normalizeRule|mismatch|submitButton|undefined|reset|addClass|switch|labelContainer||findByName|push|validClass|check|groups|currentElements|constructor|focusin|select|creditcard|bEven|previousValue|rangelength|dateISO|objectLength|focusInvalid|x20|parameters|equalTo|depends|debug|range|submit|wrapper|defaultMessage|removeClass|new|containers|handler|errors|hide|rulesCache|addWrapper|errorLabelContainer|showLabel|errorElement|clean|prepareForm|bind|focusout|validateDelegate|fn|old|delegate|fix|prepareElement|hideErrors|param|resetForm|window|ajax|characters|is|than|abort|Number|x0d|break|dependTypes|val|idOrName|submitHandler|staticRules|theregex|special|highlight|meta|cancelSubmit|eventType|defaults|click|catch|focus|findLastActive|button|size|ignoreTitle|ignore|defaultShowErrors|grep|errorContainer|selected|numberOfInvalids|error|find|RegExp|triggerHandler|checkForm|invalidHandler|onsubmit|nothing|option|checkbox|Array|radio|remove|text|makeArray|addEventListener|blur|init|autoCreateRanges|no|to|equal|x7f|and|x01|try|x0a|x22|attributeRules|lastActive|classRules|between|port|metadataRules|mode|originalMessage|normalizeRules|x0c|accept|isFunction|x0b|or|the|addClassRules|numberDE|dateDE|stopRequest|startRequest|depend|toLowerCase|nodeName|null|checked|document|errorPlacement|html|generated|map|invalidElements|show|validElements|parent|field|strong|errorContext|findDefined|String|customMessage|parentNode|customMetaMessage|id|lastElement|formatAndAdd|onfocusout|removeAttrs|cancel|assigned|has|disabled|image|blockFocusCleanup|focusCleanup|can|trigger|visible|onfocusin|label|slice|keyup|textarea|file|password|unshift|on|target|removeEventListener|teardown|setup|appendTo|warn|ajaxSettings|valueCache|gif|jpe|png|parseInt|charAt|prototype|Date|NaN|greater|uE000|unchecked|filled|https|x5d|less|x5b|x23|x21|blank|long|expr|x08|hidden|least|at|json|more|dataType|extension|default|with|addMethod|again|524288|x0e|x1f|same|2147483647|class|card|preventDefault|x7e|credit|ftp|boolean|only|getElementsByName|ISO|insertAfter|append|uF8FF|Invalid|wrap|URL|address|defined|No|Warning|This|title|setDefaults|returning|match|unbind|throw|onclick|checking|when|occured|onkeyup|removeAttr|exception|log|continue'.split('|'),0,{}));


 /*!
* Bootstrap v3.1.1 (http://getbootstrap.com)
* Copyright 2011-2014 Twitter, Inc.
* Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
*/

+function(a){"use strict";var b='[data-dismiss="alert"]',c=function(c){a(c).on("click",b,this.close)};c.prototype.close=function(b){function f(){e.trigger("closed.bs.alert").remove()}var c=a(this),d=c.attr("data-target");d||(d=c.attr("href"),d=d&&d.replace(/.(?=#[^\s]$)/,""));var e=a(d);b&&b.preventDefault(),e.length||(e=c.hasClass("alert")?c:c.parent()),e.trigger(b=a.Event("close.bs.alert"));if(b.isDefaultPrevented())return;e.removeClass("in"),a.support.transition&&e.hasClass("fade")?e.one(a.support.transition.end,f).emulateTransitionEnd(150):f()};var d=a.fn.alert;a.fn.alert=function(b){return this.each(function(){var d=a(this),e=d.data("bs.alert");e||d.data("bs.alert",e=new c(this)),typeof b=="string"&&e[b].call(d)})},a.fn.alert.Constructor=c,a.fn.alert.noConflict=function(){return a.fn.alert=d,this},a(document).on("click.bs.alert.data-api",b,c.prototype.close)}(jQuery);


/* Bootstrap Tool-tip */
+function(a){"use strict";var b=function(a,b){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",a,b)};b.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1},b.prototype.init=function(b,c,d){this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d);var e=this.options.trigger.split(" ");for(var f=e.length;f--;){var g=e[f];if(g=="click")this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if(g!="manual"){var h=g=="hover"?"mouseenter":"focusin",i=g=="hover"?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},b.prototype.getDefaults=function(){return b.DEFAULTS},b.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&typeof b.delay=="number"&&(b.delay={show:b.delay,hide:b.delay}),b},b.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},b.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);clearTimeout(c.timeout),c.hoverState="in";if(!c.options.delay||!c.options.delay.show)return c.show();c.timeout=setTimeout(function(){c.hoverState=="in"&&c.show()},c.options.delay.show)},b.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);clearTimeout(c.timeout),c.hoverState="out";if(!c.options.delay||!c.options.delay.hide)return c.hide();c.timeout=setTimeout(function(){c.hoverState=="out"&&c.hide()},c.options.delay.hide)},b.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);if(b.isDefaultPrevented())return;var c=this,d=this.tip();this.setContent(),this.options.animation&&d.addClass("fade");var e=typeof this.options.placement=="function"?this.options.placement.call(this,d[0],this.$element[0]):this.options.placement,f=/\s?auto?\s?/i,g=f.test(e);g&&(e=e.replace(f,"")||"top"),d.detach().css({top:0,left:0,display:"block"}).addClass(e),this.options.container?d.appendTo(this.options.container):d.insertAfter(this.$element);var h=this.getPosition(),i=d[0].offsetWidth,j=d[0].offsetHeight;if(g){var k=this.$element.parent(),l=e,m=document.documentElement.scrollTop||document.body.scrollTop,n=this.options.container=="body"?window.innerWidth:k.outerWidth(),o=this.options.container=="body"?window.innerHeight:k.outerHeight(),p=this.options.container=="body"?0:k.offset().left;e=e=="bottom"&&h.top+h.height+j-m>o?"top":e=="top"&&h.top-m-j<0?"bottom":e=="right"&&h.right+i>n?"left":e=="left"&&h.left-i<p?"right":e,d.removeClass(l).addClass(e)}var q=this.getCalculatedOffset(e,h,i,j);this.applyPlacement(q,e),this.hoverState=null;var r=function(){c.$element.trigger("shown.bs."+c.type)};a.support.transition&&this.$tip.hasClass("fade")?d.one(a.support.transition.end,r).emulateTransitionEnd(150):r()}},b.prototype.applyPlacement=function(b,c){var d,e=this.tip(),f=e[0].offsetWidth,g=e[0].offsetHeight,h=parseInt(e.css("margin-top"),10),i=parseInt(e.css("margin-left"),10);isNaN(h)&&(h=0),isNaN(i)&&(i=0),b.top=b.top+h,b.left=b.left+i,a.offset.setOffset(e[0],a.extend({using:function(a){e.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),e.addClass("in");var j=e[0].offsetWidth,k=e[0].offsetHeight;c=="top"&&k!=g&&(d=!0,b.top=b.top+g-k);if(/bottom|top/.test(c)){var l=0;b.left<0&&(l=b.left*-2,b.left=0,e.offset(b),j=e[0].offsetWidth,k=e[0].offsetHeight),this.replaceArrow(l-f+j,j,"left")}else this.replaceArrow(k-g,k,"top");d&&e.offset(b)},b.prototype.replaceArrow=function(a,b,c){this.arrow().css(c,a?50*(1-a/b)+"%":"")},b.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},b.prototype.hide=function(){function e(){b.hoverState!="in"&&c.detach(),b.$element.trigger("hidden.bs."+b.type)}var b=this,c=this.tip(),d=a.Event("hide.bs."+this.type);this.$element.trigger(d);if(d.isDefaultPrevented())return;return c.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?c.one(a.support.transition.end,e).emulateTransitionEnd(150):e(),this.hoverState=null,this},b.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||typeof a.attr("data-original-title")!="string")&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},b.prototype.hasContent=function(){return this.getTitle()},b.prototype.getPosition=function(){var b=this.$element[0];return a.extend({},typeof b.getBoundingClientRect=="function"?b.getBoundingClientRect():{width:b.offsetWidth,height:b.offsetHeight},this.$element.offset())},b.prototype.getCalculatedOffset=function(a,b,c,d){return a=="bottom"?{top:b.top+b.height,left:b.left+b.width/2-c/2}:a=="top"?{top:b.top-d,left:b.left+b.width/2-c/2}:a=="left"?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},b.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||(typeof c.title=="function"?c.title.call(b[0]):c.title),a},b.prototype.tip=function(){return this.$tip=this.$tip||a(this.options.template)},b.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},b.prototype.validate=function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},b.prototype.enable=function(){this.enabled=!0},b.prototype.disable=function(){this.enabled=!1},b.prototype.toggleEnabled=function(){this.enabled=!this.enabled},b.prototype.toggle=function(b){var c=b?a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type):this;c.tip().hasClass("in")?c.leave(c):c.enter(c)},b.prototype.destroy=function(){clearTimeout(this.timeout),this.hide().$element.off("."+this.type).removeData("bs."+this.type)};var c=a.fn.tooltip;a.fn.tooltip=function(c){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f=typeof c=="object"&&c;if(!e&&c=="destroy")return;e||d.data("bs.tooltip",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.tooltip.Constructor=b,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=c,this}}(jQuery);


/*
 * jQuery One Page Nav Plugin
 * http://github.com/davist11/jQuery-One-Page-Nav
 *
 * Copyright (c) 2010 Trevor Davis (http://trevordavis.net)
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://jquery.org/license
 *
 * @version 3.0.0
 *
 * Example usage:
 * $('#nav').onePageNav({
 *   currentClass: 'current',
 *   changeHash: false,
 *   scrollSpeed: 750
 * });
 */

;(function($, window, document, undefined){

  // our plugin constructor
  var OnePageNav = function(elem, options){
    this.elem = elem;
    this.$elem = $(elem);
    this.options = options;
    this.metadata = this.$elem.data('plugin-options');
    this.$win = $(window);
    this.sections = {};
    this.didScroll = false;
    this.$doc = $(document);
    this.docHeight = this.$doc.height();
  };

  // the plugin prototype
  OnePageNav.prototype = {
    defaults: {
      navItems: 'a',
      currentClass: 'current',
      changeHash: false,
      easing: 'swing',
      filter: '',
      scrollSpeed: 750,
      scrollThreshold: 0.5,
      begin: false,
      end: false,
      scrollChange: false
    },

    init: function() {
      // Introduce defaults that can be extended either
      // globally or using an object literal.
      this.config = $.extend({}, this.defaults, this.options, this.metadata);

      this.$nav = this.$elem.find(this.config.navItems);

      //Filter any links out of the nav
      if(this.config.filter !== '') {
        this.$nav = this.$nav.filter(this.config.filter);
      }

      //Handle clicks on the nav
      this.$nav.on('click.onePageNav', $.proxy(this.handleClick, this));

      //Get the section positions
      this.getPositions();

      //Handle scroll changes
      this.bindInterval();

      //Update the positions on resize too
      this.$win.on('resize.onePageNav', $.proxy(this.getPositions, this));

      return this;
    },

    adjustNav: function(self, $parent) {
      self.$elem.find('.' + self.config.currentClass).removeClass(self.config.currentClass);
      $parent.addClass(self.config.currentClass);
    },

    bindInterval: function() {
      var self = this;
      var docHeight;

      self.$win.on('scroll.onePageNav', function() {
        self.didScroll = true;
      });

      self.t = setInterval(function() {
        docHeight = self.$doc.height();

        //If it was scrolled
        if(self.didScroll) {
          self.didScroll = false;
          self.scrollChange();
        }

        //If the document height changes
        if(docHeight !== self.docHeight) {
          self.docHeight = docHeight;
          self.getPositions();
        }
      }, 250);
    },

    getHash: function($link) {
      return $link.attr('href').split('#')[1];
    },

    getPositions: function() {
      var self = this;
      var linkHref;
      var topPos;
      var $target;

      self.$nav.each(function() {
        linkHref = self.getHash($(this));
        $target = $('#' + linkHref);

        if($target.length) {
          topPos = $target.offset().top;
          self.sections[linkHref] = Math.round(topPos);
        }
      });
    },

    getSection: function(windowPos) {
      var returnValue = null;
      var windowHeight = Math.round(this.$win.height() * this.config.scrollThreshold);

      for(var section in this.sections) {
        if((this.sections[section] - windowHeight) < windowPos) {
          returnValue = section;
        }
      }

      return returnValue;
    },

    handleClick: function(e) {
      var self = this;
      var $link = $(e.currentTarget);
      var $parent = $link.parent();
      var newLoc = '#' + self.getHash($link);

      if(!$parent.hasClass(self.config.currentClass)) {
        //Start callback
        if(self.config.begin) {
          self.config.begin();
        }

        //Change the highlighted nav item
        self.adjustNav(self, $parent);

        //Removing the auto-adjust on scroll
        self.unbindInterval();

        //Scroll to the correct position
        self.scrollTo(newLoc, function() {
          //Do we need to change the hash?
          if(self.config.changeHash) {
            window.location.hash = newLoc;
          }

          //Add the auto-adjust on scroll back in
          self.bindInterval();

          //End callback
          if(self.config.end) {
            self.config.end();
          }
        });
      }

      e.preventDefault();
    },

    scrollChange: function() {
      var windowTop = this.$win.scrollTop();
      var position = this.getSection(windowTop);
      var $parent;

      //If the position is set
      if(position !== null) {
        $parent = this.$elem.find('a[href$="#' + position + '"]').parent();

        //If it's not already the current section
        if(!$parent.hasClass(this.config.currentClass)) {
          //Change the highlighted nav item
          this.adjustNav(this, $parent);

          //If there is a scrollChange callback
          if(this.config.scrollChange) {
            this.config.scrollChange($parent);
          }
        }
      }
    },

    scrollTo: function(target, callback) {
      var offset = $(target).offset().top;

      $('html, body').animate({
        scrollTop: offset
      }, this.config.scrollSpeed, this.config.easing, callback);
    },

    unbindInterval: function() {
      clearInterval(this.t);
      this.$win.unbind('scroll.onePageNav');
    }
  };

  OnePageNav.defaults = OnePageNav.prototype.defaults;

  $.fn.onePageNav = function(options) {
    return this.each(function() {
      new OnePageNav(this, options).init();
    });
  };

})( jQuery, window , document );

/**
 * jquery.dlmenu.js v1.0.1
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
;( function( $, window, undefined ) {

  'use strict';

  // global
  var Modernizr = window.Modernizr, $body = $( 'body' );

  $.DLMenu = function( options, element ) {
    this.$el = $( element );
    this._init( options );
  };

  // the options
  $.DLMenu.defaults = {
    // classes for the animation effects
    animationClasses : { classin : 'dl-animate-in-1', classout : 'dl-animate-out-1' },
    // callback: click a link that has a sub menu
    // el is the link element (li); name is the level name
    onLevelClick : function( el, name ) { return false; },
    // callback: click a link that does not have a sub menu
    // el is the link element (li); ev is the event obj
    onLinkClick : function( el, ev ) { return false; }
  };

  $.DLMenu.prototype = {
    _init : function( options ) {

      // options
      this.options = $.extend( true, {}, $.DLMenu.defaults, options );
      // cache some elements and initialize some variables
      this._config();
      
      var animEndEventNames = {
          'WebkitAnimation' : 'webkitAnimationEnd',
          'OAnimation' : 'oAnimationEnd',
          'msAnimation' : 'MSAnimationEnd',
          'animation' : 'animationend'
        },
        transEndEventNames = {
          'WebkitTransition' : 'webkitTransitionEnd',
          'MozTransition' : 'transitionend',
          'OTransition' : 'oTransitionEnd',
          'msTransition' : 'MSTransitionEnd',
          'transition' : 'transitionend'
        };
      // animation end event name
      this.animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ] + '.dlmenu';
      // transition end event name
      this.transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ] + '.dlmenu',
      // support for css animations and css transitions
      this.supportAnimations = Modernizr.cssanimations,
      this.supportTransitions = Modernizr.csstransitions;

      this._initEvents();

    },
    _config : function() {
      this.open = false;
      this.$trigger = this.$el.children( '.dl-trigger' );
      this.$menu = this.$el.children( 'ul.dl-menu' );
      this.$menuitems = this.$menu.find( 'li:not(.dl-back)' );
      this.$el.find( 'ul.dl-submenu' ).prepend( '<li class="dl-back"><a href="#">back</a></li>' );
      this.$back = this.$menu.find( 'li.dl-back' );
    },
    _initEvents : function() {

      var self = this;

      this.$trigger.on( 'click.dlmenu', function() {
        
        if( self.open ) {
          self._closeMenu();
        } 
        else {
          self._openMenu();
        }
        return false;

      } );

      this.$menuitems.on( 'click.dlmenu', function( event ) {
        
        event.stopPropagation();

        var $item = $(this),
          $submenu = $item.children( 'ul.dl-submenu' );

        if( $submenu.length > 0 ) {

          var $flyin = $submenu.clone().css( 'opacity', 0 ).insertAfter( self.$menu ),
            onAnimationEndFn = function() {
              self.$menu.off( self.animEndEventName ).removeClass( self.options.animationClasses.classout ).addClass( 'dl-subview' );
              $item.addClass( 'dl-subviewopen' ).parents( '.dl-subviewopen:first' ).removeClass( 'dl-subviewopen' ).addClass( 'dl-subview' );
              $flyin.remove();
            };

          setTimeout( function() {
            $flyin.addClass( self.options.animationClasses.classin );
            self.$menu.addClass( self.options.animationClasses.classout );
            if( self.supportAnimations ) {
              self.$menu.on( self.animEndEventName, onAnimationEndFn );
            }
            else {
              onAnimationEndFn.call();
            }

            self.options.onLevelClick( $item, $item.children( 'a:first' ).text() );
          } );

          return false;

        }
        else {
          self.options.onLinkClick( $item, event );
        }

      } );

      this.$back.on( 'click.dlmenu', function( event ) {
        
        var $this = $( this ),
          $submenu = $this.parents( 'ul.dl-submenu:first' ),
          $item = $submenu.parent(),

          $flyin = $submenu.clone().insertAfter( self.$menu );

        var onAnimationEndFn = function() {
          self.$menu.off( self.animEndEventName ).removeClass( self.options.animationClasses.classin );
          $flyin.remove();
        };

        setTimeout( function() {
          $flyin.addClass( self.options.animationClasses.classout );
          self.$menu.addClass( self.options.animationClasses.classin );
          if( self.supportAnimations ) {
            self.$menu.on( self.animEndEventName, onAnimationEndFn );
          }
          else {
            onAnimationEndFn.call();
          }

          $item.removeClass( 'dl-subviewopen' );
          
          var $subview = $this.parents( '.dl-subview:first' );
          if( $subview.is( 'li' ) ) {
            $subview.addClass( 'dl-subviewopen' );
          }
          $subview.removeClass( 'dl-subview' );
        } );

        return false;

      } );
      
    },
    closeMenu : function() {
      if( this.open ) {
        this._closeMenu();
      }
    },
    _closeMenu : function() {
      var self = this,
        onTransitionEndFn = function() {
          self.$menu.off( self.transEndEventName );
          self._resetMenu();
        };
      
      this.$menu.removeClass( 'dl-menuopen' );
      this.$menu.addClass( 'dl-menu-toggle' );
      this.$trigger.removeClass( 'dl-active' );
      
      if( this.supportTransitions ) {
        this.$menu.on( this.transEndEventName, onTransitionEndFn );
      }
      else {
        onTransitionEndFn.call();
      }

      this.open = false;
    },
    openMenu : function() {
      if( !this.open ) {
        this._openMenu();
      }
    },
    _openMenu : function() {
      var self = this;
      // clicking somewhere else makes the menu close
      $body.off( 'click' ).on( 'click.dlmenu', function() {
        self._closeMenu() ;
      } );
      this.$menu.addClass( 'dl-menuopen dl-menu-toggle' ).on( this.transEndEventName, function() {
        $( this ).removeClass( 'dl-menu-toggle' );
      } );
      this.$trigger.addClass( 'dl-active' );
      this.open = true;
    },
    // resets the menu to its original state (first level of options)
    _resetMenu : function() {
      this.$menu.removeClass( 'dl-subview' );
      this.$menuitems.removeClass( 'dl-subview dl-subviewopen' );
    }
  };

  var logError = function( message ) {
    if ( window.console ) {
      window.console.error( message );
    }
  };

  $.fn.dlmenu = function( options ) {
    if ( typeof options === 'string' ) {
      var args = Array.prototype.slice.call( arguments, 1 );
      this.each(function() {
        var instance = $.data( this, 'dlmenu' );
        if ( !instance ) {
          logError( "cannot call methods on dlmenu prior to initialization; " +
          "attempted to call method '" + options + "'" );
          return;
        }
        if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {
          logError( "no such method '" + options + "' for dlmenu instance" );
          return;
        }
        instance[ options ].apply( instance, args );
      });
    } 
    else {
      this.each(function() {  
        var instance = $.data( this, 'dlmenu' );
        if ( instance ) {
          instance._init();
        }
        else {
          instance = $.data( this, 'dlmenu', new $.DLMenu( options, this ) );
        }
      });
    }
    return this;
  };

} )( jQuery, window );