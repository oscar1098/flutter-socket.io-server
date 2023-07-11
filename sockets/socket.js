const {io} =  require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand( new Band( 'Queen' ) );
bands.addBand( new Band( 'Bon Jovi' ) );
bands.addBand( new Band( 'Metallica' ) );
bands.addBand( new Band( 'Mago de oz' ) );


// Mensajes de socktes
io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands() );

    client.on('disconnect', () => { 
        console.log('Cliente desconectado'); 
    });

    client.on('vote-band', ( paylaod ) => {

        bands.voteBand( paylaod.id );
        io.emit('active-bands', bands.getBands() );

    });

    client.on('add-band', ( paylaod ) => {
        bands.addBand( new Band( paylaod.name ) );
        io.emit('active-bands', bands.getBands() );

    });

    client.on('delete-band', ( paylaod ) => {

        bands.deleteBand( paylaod.id );
        io.emit('active-bands', bands.getBands() );

    });


    // client.on('emitir-mensaje', ( payload ) => {
        // io.emit('nuevo-mensaje', payload);// emite  a todos
    //     client.broadcast.emit('nuevo-mensaje', payload);// emite  a todos menos el que emitio
    // })

});