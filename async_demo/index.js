console.log('start async')

// getUser(1)
//     .then(user=> getRepos(user))
//     .then(repo=> console.log(repo))
//     .catch(err=>console.log(err.message));


async function displayRepo(){
    try{
        const user = await getUser(1);
        const repo = await getRepos(user);
        console.log(repo);
    }catch(err){
        console.log('error', err.message)
    }

}

displayRepo();


function getUser(id){
    return new Promise((resolve, reject)=>{
        setTimeout(()=> {
            console.log("reading user from db");
            resolve({id: id, githubRepo: "nana"});
        }, 2000)
    })

}

function getRepos(user){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log(`read repos ${user.githubRepo}`);
            resolve(['repo1', 'repo2', 'repo3', 'repo4']);
        }, 3000)
    })
}