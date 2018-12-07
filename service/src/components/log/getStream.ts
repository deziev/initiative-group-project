import {Stream, Writable} from 'stream';

export function getStream(log: (msg: any) => void): Writable {
    return new Stream.Writable({
        write: function(chunk, _encoding, next) {
            log(chunk.toString());
            next();
        }
    });
}
