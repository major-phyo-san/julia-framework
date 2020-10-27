var http = require('http');
var express = require('express');
var server = express();
var httpServer = http.createServer(server);
var domain = require('domain').create();
var cluster = require('cluster');

handler = function(req, res, next){
    
    // handle errors on this domin
    domain.on('error', function(err){
        console.error('Domain ERROR CAUGHT\n', err.stack)
        try {
            // failsafe shutdown in 5 seconds
            setTimeout(function(){
                console.error('Failsafe shutdown');
                process.exit(1);
            }, 5000);

            // disconnect from the cluster            
            if(cluster.isWorker){
                var worker = cluster.worker;
                worker.disconnect;
            }
            
            // stop taking new requests
            httpServer.close();

            try{
                // attempt to use Express error route
                next(err);
            }
            catch(err){
                // if Express error route failed, try
                // plain Node response
                console.error('Express error mechanism failed.\n', err.stack);
                res.statuCode = 500;
                res.setHeader('content-type', 'text/plain');
                res.end('Serious server error');
            }
        }
        catch (err) {
            console.error('Unable to send 500 response.\n', err.stack);
        }
    });

    // add the request and response objects to the domain
    domain.add(req);
    domain.add(res);

    //execute the rest of the request chain in the domain
    domain.run(next);
}

module.exports = handler;