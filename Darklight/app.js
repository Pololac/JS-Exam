class ThemeSwitcher {

    constructor(){
        this.backBody = document.querySelector("body");
        this.lightBtn = document.getElementById("lightThemeBtn");
        this.darkBtn = document.getElementById("darkThemeBtn");

        this.getTheme = localStorage.getItem('theme');
        if (this.getTheme){
            if(this.getTheme === "Dark"){
                this.backBody.classList.add("dark");
            } else {
                this.backBody.classList.remove("dark");
            }
        } else {
            this.backBody.classList.remove("dark");
        };

        this.lightBtn.addEventListener("click", () => this.toLight());
        this.darkBtn.addEventListener("click", () => this.toDark());
    }

    toDark(){
        this.backBody.classList.add("dark");
        localStorage.setItem('theme', 'Dark');
    }

    toLight(){
        this.backBody.classList.remove("dark");
        localStorage.setItem('theme', 'Light');
    }
}

document.addEventListener("DOMContentLoaded", () => {
   const switchTheme = new ThemeSwitcher();
})