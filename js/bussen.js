'use strict'

let doc = require('deck-of-cards');
let jquery = require('jquery');


var $ = jquery.$;
var Deck = doc.Deck;

var $container = document.getElementById('container');

// create Deck
//let deck = Deck();

// add to DOM
//deck.mount($container);

let buslenght = 5;
let eersteopen = false;

let offsetX = -450;
let offsetY = -150;

let cardWidth = 75;
let cardMargin = 5;
let cardHeight = 110;

let ronde = 1;

let huidigeRij = [];
let huidigeRijIndex = 0;

let $buttonVolgendeKaart = $("#volgende");
let $buttonOpnieuw = $("#opnieuw");
let $buttonCorrect = $("#goed");
let $buttonFout = $("#fout");

reset();

var reset = function()
{
    deck.unmount();
    deck = Deck();
    deck.mount($container);
    deck.shuffle();

    deck.x = 50;
    deck.y = 50;

    $buttonVolgendeKaart.show();
    $buttonCorrect.hide();
    $buttonFout.hide();

    resetVars();

    setTimeout(function () {

        let bus = deck.cards.splice(0, 5);
        huidigeRij = bus;

        bus.forEach(function (card, i) {
            card.animateTo({
                delay: 0,
                duration: 500,
                ease: 'quartOut',
                y: offsetY,
                x: offsetX + (i * (cardWidth + cardMargin))
            });
        });
    }, 500);
}

var resetVars = function()
{
    ronde = 1;
    huidigeRij = [];
    huidigeRijIndex = 0;

}

var goed = function()
{
    $buttonVolgendeKaart.show();
    $buttonCorrect.hide();
    $buttonFout.hide();

    huidigeRijIndex+=1;
    if (huidigeRijIndex == 5)
    {
        window.alert("Je bent uit de bus!");
    }
}

var fout = function()
{
    $buttonVolgendeKaart.show();
    $buttonCorrect.hide();
    $buttonFout.hide();

    huidigeRijIndex = 0;
    ronde += 1;
}

var draaiKaart = function()
{
    $buttonVolgendeKaart.hide();
    $buttonCorrect.show();
    $buttonFout.show();

    let bus = deck.cards.splice(0, 1);

    bus.forEach(function (card, i) {
        card.animateTo({
            delay: 0,
            duration: 500,
            ease: 'quartOut',
            y: offsetY - (ronde * 50),
            x: offsetX + (huidigeRijIndex * (cardWidth + cardMargin))
        });
    });

    bus[0].setSide('front');
    huidigeRij[huidigeRijIndex].setSide('front');
}