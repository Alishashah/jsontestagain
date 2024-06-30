// // import react from 'react';

// export const StringFormatter = (queryStr,queryArr) => {
//     String.prototype.format = function() {
//         var formatted = this;
//         for( var arg in arguments ) {
//             formatted = formatted.replace("'{" + arg + "}'", "N'"+arguments[arg].replaceAll("'","''")+"'");
//         }
//         return formatted;
//     };

//     var str = queryStr.format(...queryArr)
//     return str
// }

// export const brTagReplacer = (str) => {
//     var string = str;
//     string = string.replace(/<br\s*\/?>/gi,'<br/>');
//     return string;
// }



export const StringFormatter = (queryStr, queryArr) => {
    const formatString = (str, ...args) => {
        let formatted = str;
        for (let i = 0; i < args.length; i++) {
            formatted = formatted.replace(`'{${i}}'`, `N'${args[i].replaceAll("'", "''")}'`);
        }
        return formatted;
    };

    return formatString(queryStr, ...queryArr);
};

export const brTagReplacer = (str) => {
    return str.replace(/<br\s*\/?>/gi, '<br/>');
};
