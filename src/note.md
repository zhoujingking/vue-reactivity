Problem:
get(target, key, reciever) {
    track(target, key);
    return Reflect.get(target, key, reciever);
},

every time it accesses its property, track is invoked even if 
the property is not in effect().