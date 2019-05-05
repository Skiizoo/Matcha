//src/config/bdd.js
var sqlite = require('better-sqlite3')('./config/database.db');

/**
 * Debug show error in console
 */
global.debug = true;


/**
 * Class database
 */
global.database = {
    /**
     * Prepare a request
     * @param {string} line (ex: SELECT * FROM user)
     * @return safe sqlite prepare
     */
    prepare(line) {
        try {
            return sqlite.prepare(line);
        } catch (err) {
            if (debug) console.error(err);
            return;
        }
    },

    /**
     * Insert in database
     * @param {string} table (ex: "user")
     * @param {object} values (ex: { "id": 1 })
     * @returns {object} { "success": boolean, "res": object }
     */
    insert(table, values) {
        var col = Object.keys(values),
            req, reqField, reqValue;
        
        try {
            // Creating request
            reqField = col.join('", "');
            reqValue = col.join(', @');
            req = `INSERT INTO \`${table}\` ("${reqField}") VALUES (@${reqValue})`;
            
            return {
                "success": true,
                "res": sqlite.prepare(req).run(values)
            };
        } catch(err) {
            return {
                "success": false,
                "res": err
            };
        }
    },

    /**
     * Request for SELECT * FROM ${table} WHERE ${values} AND ${values}...
     * @param {*} table (ex: "user")
     * @param {*} values (ex: { "nickName": "stpuget" })
     * @returns {object} { "success": boolean, "res": object }
     */
    select(table, values) {
        var col = Object.keys(values),
            req, reqValue = Array();
        
        try {
            for ( i = 0 ; i < col.length ; i++)
                reqValue.push(`${table}.${col[i]} = @${col[i]}`);
            req = `SELECT * FROM ${table} WHERE ${reqValue.join(" AND ")}`;

            return {
                "success": true,
                "res": sqlite.prepare(req).all(values)
            };
        } catch (err) {
            return {
                "success": false,
                "res": err
            };
        }
    },

    /**
     * Request for SELECT * FROM ${table} WHERE ${values} AND ${values}...
     * @param {*} table (ex: "user")
     * @param {*} values (ex: { "nickName": "stpuget" })
     * @returns {object} { "success": boolean, "res": object }
     */
    selectOne(table, values) {
        var col = Object.keys(values),
            req, reqValue = Array();
        
        try {
            for ( i = 0 ; i < col.length ; i++)
                reqValue.push(`${table}.${col[i]} = @${col[i]}`);
            req = `SELECT * FROM ${table} WHERE ${reqValue.join(" AND ")}`;

            return {
                "success": true,
                "res": sqlite.prepare(req).get(values)
            };
        } catch (err) {
            return {
                "success": false,
                "res": err
            };
        }
    },

    /**
     * Request for DELETE FROM ${table} WHERE ${values} AND ${values}...
     * @param {*} table (ex: "user")
     * @param {*} values (ex: { "nickName": "stpuget" })
     * @returns {object} { "success": boolean, "res": object }
     */
    delete(table, values) {
        var col = Object.keys(values),
            req, reqValue = Array();
        
        try {
            for ( i = 0 ; i < col.length ; i++)
                reqValue.push(`${table}.${col[i]} = @${col[i]}`);
            req = `DELETE FROM ${table} WHERE ${reqValue.join(" AND ")}`;

            return {
                "success": true,
                "res": sqlite.prepare(req).run(values)
            };
        } catch (err) {
            return {
                "success": false,
                "res": err
            };
        }
    },

    /**
     * Request for UPDATE ${table} SET ${values}, ${value},.. WHERE ${values} AND ${values}...
     * @param {*} table (ex: "user")
     * @param {*} values (ex: { "nickName": "stpuget" })
     * @returns {object} { "success": boolean, "res": object }
     */
    update(table, id, values) {
        var col = Object.keys(values),
            req, reqSet = Array();
        
        try {
            for ( i = 0 ; i < col.length ; i++)
                reqSet.push(`${col[i]}=@${col[i]}`);
            
            req = `UPDATE ${table} SET ${reqSet.join(", ")} WHERE id=${id}`;

            return {
                "success": true,
                "res": sqlite.prepare(req).run(values)
            };
        } catch (err) {
            return {
                "success": false,
                "res": err
            };
        }
    }
}