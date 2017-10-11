"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Header = React.createClass({
   render: function () {
       return (
           <nav className ="navbar navbar-default">
               <div className="container-fluid">

                   <ul className="nav navbar-nav">
                       <li><Link className="navbar-brand" to="app">
                           <img className="img-responsive pull-left" height={60} width={60} marginHeight={0} src = "images/pluralsight-logo.ico"/>
                       </Link></li>
                       <li> <Link to = "app">Home </Link> </li>
                       <li> <Link to = "authors">Authors </Link> </li>
                       <li> <Link to = "about">About </Link> </li>

                   </ul>

               </div>
           </nav>
       );
   }
});

module.exports = Header;