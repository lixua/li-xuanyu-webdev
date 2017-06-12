/**
 * Created by xuanyuli on 6/7/17.
 */

var date = new Date();
var crypto = require("crypto-js");

var regionName = "us-east-1"
var secretKey = "af1pBXz+W7izPB0TpYcHr/ayQmFLxXSux+TMEtan"


var service = "AWSECommerceService";
var Operation = "ItemSearch";
var ResponseGroup = "Small";
var SearchIndex = "All";
var Keywords = "harry_potter";
var AWSAccessKeyId = "AKIAIWOXKAS7OD4N2CPQ";
var AssociateTag = "lixuanyuchenw-20";
var Timestamp = date.toISOString();
var signature = getSignatureKey(crypto);
var url = "http://webservices.amazon.com/onca/xml?" +
            "Service=" + service +
            "&Operation="+Operation +
            "&ResponseGroup=" + ResponseGroup +
            "&SearchIndex=" + SearchIndex +
            "&Keywords=" +Keywords +
            "&AWSAccessKeyId=" + AWSAccessKeyId +
            "&AssociateTag=" + AssociateTag +
            "&Timestamp=" + Timestamp +
            "&Signature=" + signature;



function yyyymmdd(adate) {
    var mm = adate.getMonth() + 1;
    var dd = adate.getDate();
    return [adate.getFullYear(),
        (mm>9 ? '' : '0') + mm,
        (dd>9 ? '' : '0') + dd
    ].join('');
};
function getSignatureKey(Crypto){
    var kDate = Crypto.HmacSHA256(yyyymmdd(date), "AWS4" + secretKey);
    var kRegion = Crypto.HmacSHA256(regionName, kDate);
    var kService = Crypto.HmacSHA256(service, kRegion);
    var kSigning = Crypto.HmacSHA256("aws4_request", kService);
    return kSigning;
}
console.log(url);
