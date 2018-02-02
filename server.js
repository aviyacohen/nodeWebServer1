const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    const time = new Date().toString();
    const log = {
        time,
        method: req.method,
        url: req.url
    }
    logJSON = JSON.stringify(log);
    fs.appendFile("server.log", `${logJSON}\n`, (error)=> {
        (error) ? console.log(error) : undefined;
    })
    next();
});

app.use((req, res, next) =>{
    res.render("maintenance", {
        pageUrl: req.hostname + req.url
    });
});

app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => new Date().getFullYear());

app.get("/about", (req, res) => {
    res.render("regular.hbs", {
        pageTitle: "About",
        sectionTitle: "This section tells about the company.",
        sectionParagraph: "Info like staff, products, company story etc. can be found here.",
    });
});

app.get("/branches", (req, res) => {
    res.render("regular.hbs", {
        pageTitle: "Branches",
        sectionTitle: "This is a section lists the different branches of the company.",
        sectionParagraph: "The user can find branches in various location and look through their info.",
    });
});

app.listen(3000, ()=>{
    console.log("Server listening on port 3000");
});