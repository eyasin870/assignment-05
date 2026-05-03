const tabInActive =["text-gray-500", "border-gray-200",];
const tabActive = ["btn-primary", "text-white", "border-blue"];
function switchTab(tab){
    // console.log(tab)
    const tabs = ["all","open","closed"];
    for(const t of tabs){
        const tabName = document.getElementById('tab-'+t);
        // console.log(tabName)
        if(t===tab){
            tabName.classList.remove(...tabInActive);
            tabName.classList.add(...tabActive)
        }
        else{
             tabName.classList.add(...tabInActive);
            tabName.classList.remove(...tabActive)
        }
    }
}
