// Put the modal up right away
loadGameScreen('selectGameScreen', {lobbies: [{gameID: 1, name: 'The Only Game'}]});
$('.modalDialog').addClass('active');

$('.gameSelect').on('touch click', function() {
    // TODO Emit a joining game event, fade in the game lobby
    loadGameScreen('lobbyScreen', {
        lobby: {name: 'The Only Game'},
        players: [{readyIndicator: 'waiting', name: 'Dr. Bob'}]
    });

    $('.startGame').on('touch click', function() {
        console.log('Time to Start!');
        // TODO emit a starting game type event thing
        $('.modalDialog').removeClass('active');
    });
});