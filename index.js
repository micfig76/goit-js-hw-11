/* empty css                      */import{S as c,i as n}from"./assets/vendor-gLw1-KSg.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const l="35720970-632b5595f4a574f3205602e3c",p=new c(".gallery a#lightbox-link");document.querySelector("form#image-search").addEventListener("submit",async a=>{a.prventDefault();const r=a.target,s=r.elements.query.value;r.reset();const o=document.querySelector(".gallery");o.replaceChildren(createLoader());const e=await h(s).catch(t=>{n.error({message:"Sorry, the images can`t be loaded. Please try again later",position:"topRight"}),console.log(t),o.replaceChildren()});if(e.hits.length===0){n.error({message:"Sorry, there are no images matching your search. Please try again later",position:"topRight"}),o.replaceChildren();return}e.hits.map(toGalleryPhoto).map(createCard).map(applyLightbox),o.replaceChildren(...photoCards),p.refresh()});const h=async a=>{const r=new URLSearchParams({key:l,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0});return fetch(`https://pixabay.com/api/?${r}`).then(s=>s.json())};
//# sourceMappingURL=index.js.map
