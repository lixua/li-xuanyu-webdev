/**
 * Created by xuanyuli on 6/6/17.
 */
var oldlist1=['0', '1', '2', '3', '4', '5', '6' ]
var temp = oldlist1[2];
oldlist1.splice(2,1)
oldlist1.splice(1,0,temp);

console.log(oldlist1)