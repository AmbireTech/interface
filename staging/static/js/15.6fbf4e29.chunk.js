(this["webpackJsonp@uniswap/interface"]=this["webpackJsonp@uniswap/interface"]||[]).push([[15],{1914:function(e,r,t){},1958:function(e,r,t){"use strict";t.r(r);var s=t(27),a=t(10),g=t(241),c=t(76),n=t(545),w=t(116),l=t(141),i=t(1765),j=t(74),z=t(213),b=t(186),h=t(1698),m=t(1),o=t(96),d=(t(327),t(503),t(1914),"hwks9j7 rgw6ezcs rgw6ez48g rgw6ezas rgw6ezns rgw6ezta rgw6eztm rgw6ezdy rgw6ezdn"),u="hwks9jo rgw6ezag rgw6ez48g rgw6ezts rgw6ezd4",x="hwks9j16 rgw6ez48m rgw6ezaa rgw6ezj4",O=t(0);r.default=function(){var e=Object(m.useState)(3e3),r=Object(a.a)(e,2),t=r[0],f=r[1],p=Object(m.useState)(!1),k=Object(a.a)(p,2),y=k[0],N=k[1],S=Object(z.n)((function(e){return e.txHash})),R=Object(z.n)((function(e){return e.setState})),T=Object(z.n)((function(e){return e.state})),C=Object(m.useRef)(T),P=Object(z.o)((function(e){return e.transactionResponse})),v=Object(z.o)((function(e){return e.setTransactionResponse})),H=Object(z.h)(),U=Object(o.b)(1,S,o.a.TRANSACTION),W=(T===b.k.Success||T===b.k.Failed)&&T,E=Object(m.useMemo)((function(){return Object(h.m)(P,t)}),[P,t]),F=E.nftsPurchased,I=E.nftsNotPurchased,q=E.showPurchasedModal,B=E.showRefundModal,L=E.totalPurchaseValue,M=E.totalRefundValue,A=E.totalUSDRefund,D=E.txFeeFiat;function _(){v({}),R(b.k.New)}return Object(m.useEffect)((function(){Object(h.c)().then((function(e){f(null!==e&&void 0!==e?e:0)}))}),[]),Object(m.useEffect)((function(){z.n.subscribe((function(e){return C.current=e.state}))}),[]),Object(O.jsx)(O.Fragment,{children:W&&Object(O.jsxs)(n.a,{children:[Object(O.jsx)(i.a,{onClick:_}),Object(O.jsxs)(c.b,{className:"hwks9j1 rgw6ez3zg rgw6ez43g rgw6ez3ys rgw6ez1ay rgw6ez14g rgw6ez14n rgw6ez2z4 rgw6ez345 rgw6ez3a4 rgw6ez3mm",onClick:_,children:[q&&Object(O.jsxs)(c.b,{className:"hwks9j3 rgw6ez4ha rgw6ez6a6 rgw6ez3zg rgw6ez3ys rgw6ez1b4 rgw6ez43m rgw6ez14g rgw6ez14n rgw6ez2ks rgw6ez2kt rgw6ez24a rgw6ez24b",onClick:i.b,children:[Object(O.jsx)(l.tb,{color:j.d.color.pink400,width:"36",height:"36",className:"rgw6ez43a rgw6ez31g rgw6ez37a"}),Object(O.jsxs)(c.b,{display:"flex",flexWrap:"wrap",width:"full",height:"min",children:[Object(O.jsx)("h1",{className:d,children:"Complete!"}),Object(O.jsx)("p",{className:"hwks9jd rgw6ez48g rgw6ezag rgw6ez14g rgw6ez40y rgw6ezns rgw6ezta rgw6eztm rgw6ezey",children:"Uniswap has granted your wish!"})]}),Object(O.jsx)(c.b,{className:"hwks9jf rgw6ez3zg rgw6ez3ys rgw6ez14g rgw6ez6jm rgw6ez42a",style:{maxHeight:F.length>32?H?"172px":"292px":"min-content"},children:Object(s.a)(F).map((function(e,r){return Object(O.jsx)("img",{className:Object(g.default)("hwks9jh rgw6ez6a6 rgw6ez3sm",F.length>1&&"rgw6ezom rgw6ezoz rgw6ezdm rgw6ezdz"),style:{maxHeight:"".concat(Object(h.i)(F.length,H),"px"),maxWidth:"".concat(Object(h.i)(F.length,H),"px")},src:e.imageUrl,alt:e.name},r)}))}),F.length>32&&Object(O.jsx)(c.b,{className:"hwks9jk"}),Object(O.jsxs)(c.b,{display:"flex",width:"full",height:"min",flexDirection:"row",marginTop:{sm:"20",md:"20"},flexWrap:{sm:"wrap",md:"nowrap"},alignItems:"center",paddingRight:"40",paddingLeft:"40",className:"rgw6ez48g rgw6ezag",justifyContent:"space-between",children:[Object(O.jsxs)(w.c,{children:[Object(O.jsxs)(c.b,{marginRight:"16",children:[F.length," NFT",1===F.length?"":"s"]}),Object(O.jsxs)(c.b,{children:[Object(h.d)(L.toString())," ETH"]})]}),Object(O.jsx)("a",{href:U,target:"_blank",rel:"noreferrer",children:Object(O.jsx)(c.b,{color:"textPrimary",fontWeight:"normal",children:Object(h.q)(S,2,2)})})]})]}),B&&(q?Object(O.jsxs)(c.b,{className:"hwks9j10 rgw6ez4ha rgw6ez6a6 rgw6ez3zg rgw6ez3ys rgw6ez2km rgw6ez2kz rgw6ez2em rgw6ez2f5 rgw6ez29m rgw6ez29z rgw6ez1b4 rgw6ez14g rgw6ez14n rgw6ez43m rgw6ezug",onClick:i.b,children:[Object(O.jsxs)(c.b,{height:"full",display:"inline-flex",flexWrap:"wrap",width:{sm:"full",md:"half"},paddingRight:{sm:"0",md:"32"},children:[Object(O.jsx)(l.P,{color:"pink"}),Object(O.jsx)("p",{className:"hwks9j12 rgw6ez48g rgw6ezcs rgw6ezam rgw6ezj4 rgw6ezta rgw6ezd4 rgw6ezib",children:"Instant Refund"}),Object(O.jsxs)("p",{className:"hwks9j14 rgw6ez48g rgw6ezag rgw6ezns rgw6ezta rgw6ezum rgw6ezem rgw6ez14g",children:["Uniswap returned"," ",Object(O.jsxs)("span",{style:{fontWeight:"700"},children:[Object(h.d)(M.toString())," ETH"]})," back to your wallet for unavailable items."]}),Object(O.jsxs)(c.b,{display:"flex",flexWrap:"wrap",bottom:"24",width:"full",alignSelf:"flex-end",position:{sm:"absolute",md:"static"},children:[Object(O.jsxs)("p",{className:u,style:{marginBottom:"2px"},children:[Object(h.d)(M.toString())," ETH"]}),Object(O.jsx)("p",{className:x,children:Object(h.e)(A)}),Object(O.jsxs)("p",{className:u,style:{width:"100%"},children:["for ",I.length," unavailable item",1===I.length?"":"s","."]}),Object(O.jsx)(c.b,{position:{sm:"absolute",md:"relative"},right:{sm:"0",md:"auto"},bottom:{sm:"0",md:"auto"},justifyContent:{sm:"flex-end",md:"flex-start"},textAlign:{sm:"right",md:"left"},flexShrink:"0",marginRight:{sm:"40",md:"24"},width:{sm:"half",md:"auto"},children:Object(O.jsx)("a",{href:U,target:"_blank",rel:"noreferrer",children:Object(O.jsx)(c.b,{fontWeight:"normal",marginTop:"16",className:u,children:Object(h.q)(S,2,2)})})})]})]}),Object(O.jsx)(c.b,{className:"hwks9j18 rgw6ez1b4 rgw6ez1az rgw6ez14g rgw6ez14b rgw6ez3ys rgw6ez6jm rgw6ez41m rgw6ez3zm rgw6ez295",children:I.map((function(e,r){return Object(O.jsx)(c.b,{display:"flex",flexWrap:"wrap",height:"min",width:"52",children:Object(O.jsx)("img",{className:"hwks9j1a rgw6ez18g rgw6ez11y rgw6ez69m rgw6ezom rgw6ezda",src:e.imageUrl,alt:e.name},r)},r)}))}),Object(O.jsx)(c.b,{className:"hwks9j1f rgw6ez14g rgw6ez14b rgw6ezns rgw6ez3l4"})]}):Object(O.jsxs)(c.b,{className:"hwks9j1h rgw6ez4ha rgw6ez6a6 rgw6ez3zg rgw6ez3ys rgw6ezta rgw6ez40y rgw6ezns rgw6ezmz rgw6ez2qg rgw6ez1b4",onClick:i.b,children:[Object(O.jsx)(c.b,{marginLeft:"auto",marginRight:"auto",display:"flex",children:T===b.k.Success?Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)(l.P,{}),Object(O.jsx)("h1",{className:d,children:"Instant Refund"})]}):Object(O.jsx)("h1",{className:d,children:"Failed Transaction"})}),Object(O.jsxs)("p",{className:"hwks9j1n rgw6ez48g rgw6ezag rgw6ezns rgw6ezta rgw6ezu4",children:[T===b.k.Success&&"Selected item".concat(1===F.length?" is":"s are"," no longer available. Uniswap instantly refunded you for this incomplete transaction. "),Object(h.f)(D)," was used for gas in attempt to complete this transaction. For support, please visit our ",Object(O.jsx)("a",{href:"https://discord.gg/FCfyBSbCU5",children:"Discord"})]}),Object(O.jsxs)(c.b,{className:"hwks9j1p rgw6ez1ay rgw6ez14g",children:[I.length>=3&&Object(O.jsxs)(c.b,{className:"rgw6ez5im rgw6ez69m rgw6ez3zg rgw6ez3ys rgw6ezts rgw6ezda rgw6ez18g rgw6ez68q",onClick:function(){N(!y)},children:[!y&&Object(O.jsx)(c.b,{paddingLeft:"20",paddingTop:"8",paddingBottom:"8",children:I.slice(0,3).map((function(e,r){return Object(O.jsx)("img",{style:{zIndex:2-r},className:"hwks9j1u rgw6ez69i rgw6ez17m rgw6ez114 rgw6ez43m",src:e.imageUrl,alt:e.name},r)}))}),Object(O.jsxs)(c.b,{color:y?"textPrimary":"textSecondary",className:"hwks9j1w rgw6ez48m rgw6ezca rgw6ezag rgw6ez2jg rgw6ez22y rgw6ez28s",children:["Unavailable",Object(O.jsxs)(c.b,{className:"hwks9j1y rgw6ezca rgw6ezaa rgw6ez3zg",children:[I.length," item",1===I.length?"":"s"]})]}),Object(O.jsx)(l.r,{className:"".concat(!y&&"hwks9j24"," ").concat("hwks9j23 rgw6ezia rgw6ezim rgw6ezta rgw6ez16s rgw6ez10a")})]}),(y||I.length<3)&&I.map((function(e,r){return Object(O.jsxs)(c.b,{backgroundColor:"backgroundSurface",display:"flex",padding:"4",marginBottom:"1",borderRadius:"8",children:[Object(O.jsx)(c.b,{className:"hwks9j1z",children:Object(O.jsx)("img",{className:"hwks9j21 rgw6ez69i rgw6ez1bs rgw6ez1r4 rgw6ez15a rgw6ez1e4 rgw6ez444",src:e.imageUrl,alt:e.name})}),Object(O.jsxs)(c.b,{flexWrap:"wrap",marginTop:"4",children:[Object(O.jsx)(c.b,{marginLeft:"4",width:"full",display:"flex",children:Object(O.jsxs)("p",{className:u,style:{marginBottom:"2px"},children:[Object(h.d)(e.updatedPriceInfo?e.updatedPriceInfo.ETHPrice:e.priceInfo.ETHPrice)," ","ETH"]})}),Object(O.jsx)(c.b,{color:"textPrimary",className:x,children:T===b.k.Success?"Refunded":e.name})]})]},r)}))]}),y&&Object(O.jsx)(c.b,{className:"hwks9j1q"}),Object(O.jsxs)("p",{className:u,style:{marginBottom:"2px"},children:[Object(h.d)(M.toString())," ETH"]}),Object(O.jsx)("p",{className:x,children:Object(h.e)(A)}),Object(O.jsx)(c.b,{className:"hwks9j9 rgw6ez48m rgw6eza4 rgw6ez3zg rgw6ez34 rgw6ez1b4 rgw6ez364",marginLeft:"auto",marginRight:"0",children:Object(O.jsx)("a",{href:U,target:"_blank",rel:"noreferrer",children:Object(O.jsx)(c.b,{className:"hwks9jb rgw6ez48m rgw6eza4 rgw6ezca rgw6ezu4",children:Object(h.q)(S,2,2)})})}),Object(O.jsxs)("p",{className:u,children:["for ",I.length," unavailable item",1===I.length?"":"s","."]}),Object(O.jsxs)(c.b,{as:"button",border:"none",backgroundColor:"genieBlue",cursor:"pointer",className:"hwks9j1j rgw6ez17s rgw6ez40y rgw6ezcs rgw6ezag rgw6ez46m rgw6ez5jm rgw6ez3zg rgw6ez34 rgw6ezns rgw6ezta rgw6ezum",type:"button",onClick:function(){return _()},children:[Object(O.jsx)(l.i,{className:"rgw6ez5zy rgw6ezjs rgw6ezqa"}),"Return to Marketplace"]})]}))]})]})})}}}]);
//# sourceMappingURL=15.6fbf4e29.chunk.js.map