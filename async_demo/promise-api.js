const p1 = new Promise((resolve) => {
    setTimeout(()=>{
        resolve(1);
    },2000)
})

const p2 = new Promise((resolve)=>{
    setTimeout(()=>{
        resolve(1);
    },3000)
})

Promise.all([p1, p2])
    .then(result => console.log(result));