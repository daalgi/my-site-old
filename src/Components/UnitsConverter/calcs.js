const DECIMALS = 6
const VALID_PREPOSITIONS = ["in", "to"]

/**
 * Object of quantities (i.e. length) with units (i.e. m, ft, km) and their equivalent
 * in terms of the unit of reference (always the first one)
 */
const UNITS = {
    length: {
        m: 1,
        nm: 1e6, mm: 1e3, cm: 1e2, dm: 10,
        dam: 0.1, hm: 0.01, km: 1e-3,
        in: 39.37007874015748, ft: 3.2808398950131235, yd: 1.0936132983377078,
        mi: 0.0006213711922373339, league: 0.000179986
    },
    mass: {
        kg: 1,
        g: 1000, cg: 100, dag: 10,
        t: 0.001,
        lbs: 2.204622621848775, oz: 35.2739619495804
    },
    time: {
        s: 1,
        min: 1 / 60, h: 1 / 3600, days: 1 / 3600 / 24,
        weeks: 1 / 3600 / 24 / 7, months: 1 / 3600 / 24 / 30.4167,
        years: 1 / 3600 / 24 / 365.25
    },
    temperature: {
        "ºC": (t, unit) => {
            //console.log(t, unit)
            if (unit === "ºC") return t
            else if (unit === "ºF") return (t - 32) * 5 / 9
            else if (unit === "K") return (t - 273.15)
            else return 0
        },
        "ºF": (t, unit) => {
            if (unit === "ºC") return t * 9 / 5 + 32
            else if (unit === "ºF") return t
            else if (unit === "K") return (t - 273.15) * 9 / 5 + 32
            else return 0
        },
        "K": (t, unit) => {
            if (unit === "ºC") return t + 273.15
            else if (unit === "ºF") return (t - 32) * 5 / 9 + 273.15
            else if (unit === "K") return t
            else return 0
        }
    },
    angle: {
        deg: 1,
        rad: Math.PI / 180,
        grad: 10 / 9
    },
    area: {
        m2: 1,
        nm2: 1e12, mm2: 1e6, cm2: 1e4, dm2: 1e2,
        dam2: 1e-2, hm2: 1e-4, km2: 1e-6,
        in2: 39.37007874015748 * 39.37007874015748,
        ft2: 3.2808398950131235 * 3.2808398950131235,
        yd2: 1.0936132983377078 * 1.0936132983377078,
        mi2: 0.0006213711922373339 * 0.0006213711922373339,
        league2: 0.000179986 * 0.000179986
    },
    volume: {
        m3: 1,
        nm3: 1e18, mm3: 1e9, cm3: 1e6, dm3: 1e3,
        dam3: 1e-3, hm3: 1e-6, km3: 1e-9,
        in3: 39.37007874015748 * 39.37007874015748 * 39.37007874015748,
        ft3: 3.2808398950131235 * 3.2808398950131235 * 3.2808398950131235,
        yd3: 1.0936132983377078 * 1.0936132983377078 * 1.0936132983377078,
        mi3: 0.0006213711922373339 * 0.0006213711922373339 * 0.0006213711922373339,
        league3: 0.000179986 * 0.000179986 * 0.000179986
    },
    speed: {
        "m/s": 1,
        "m/min": 60, "m/h": 3600,
        "km/s": 1e-3, "km/min": 60e-3, "km/h": 3.6,
        "ft/s": 3.2808398950131235, "ft/min": 3.2808398950131235 * 60, "ft/h": 3.2808398950131235 * 3600,
        "yd/s": 1.0936132983377078, "yd/min": 1.0936132983377078 * 60, "yd/h": 1.0936132983377078 * 3600,
        "mi/s": 0.0006213711922373339, "mi/min": 0.0006213711922373339 * 60, "mi/h": 0.0006213711922373339 * 3600,
    },
    acceleration: {
        "m/s2": 1,
        "m/min2": 3600, "m/h2": 1296e4,
        "km/s2": 1e-3, "km/min2": 3600e-3, "km/h2": 12960,
        "ft/s2": 3.2808398950131235, "ft/min2": 3.2808398950131235 * 3600, "ft/h2": 3.2808398950131235 * 1296e4,
        "yd/s2": 1.0936132983377078, "yd/min2": 1.0936132983377078 * 3600, "yd/h2": 1.0936132983377078 * 1296e4,
        "mi/s2": 0.0006213711922373339, "mi/min2": 0.0006213711922373339 * 3600, "mi/h2": 0.0006213711922373339 * 1296e4,
    },
    force: {
        N: 1,
        kN: 0.001, MN: 0.000001,
        lbf: 0.22480894387096, kips: 0.00022480894309971
    },
    pressure: {
        Pa: 1,
        kPa: 1e-3, MPa: 1e-6, GPa: 1e-9,
        psi: 1.45037737730209222E-4, "lb/in2": 1.45037737730209222E-4,
        ksi: 1.45037737730209222e-7, "kip/in2": 1.45037737730209222e-7,
        "lb/ft2": 0.00014503773772954,
        "kip/ft2": 0.0094734648250251,
        atm: 9.8692326671601283e-6, at: 1.01971621297792824E-5, bars: 1e-5,
        mmH2O: 0.101971621297792824, cmH2O: 0.0101971621297792824,
        mmHg: 0.00750061575845656334, inHg: 2.95299833010100919E-4,
        torr: 0.00750061682704169751,
    },
    energy: {
        J: 1,
        kJ: 1e-3, MJ: 1e-6,
        cal: 0.23900573613766732,
        "lbf-ft": 0.74
    },
    power: {
        kW: 1,
        W: 1e3,
        MW: 1e-3, GW: 1e-6,
        hp: 1.341022089595028
    }
}

/**
 * 
 * @param {Object} obj 
 * @param {String} key 
 * @returns {Object} nested object whose parent key is matched with the passed key
 * in a case insensitive way
 */
const getConversionForUnitCaseInsensitive = (obj, key) => {
    //console.log('getConversionForUnitCaseInsensitive', obj, key)
    if (!key) return null
    return obj[Object.keys(obj).filter(v => v.toLowerCase() === key.toLowerCase())]
}


/**
 * Get the original string (including lower-upper case letters) of a given 
 * case insenstitive unit
 * @param {String} quantity 
 * @param {String} convertTo - case insensitive
 * @returns {String} convertTo unit with the original case sensitive letters
 */
const getUnitOriginalString = (quantity, convertTo) => {
    if (!convertTo) return null
    return Object.keys(UNITS[quantity]).filter(k => k.toLowerCase() === convertTo.toLowerCase())[0]
}


/**
 * Find the quantity of a unit, for instance: kg --> weight
 * @param {String} unit 
 */
const findQuantity = (unit) => {
    //console.log('findQuantity()', typeof unit, unit)
    if (!unit) return null
    if (typeof unit !== "string") return null
    let quantity = null
    Object.keys(UNITS).forEach((item) => {
        //console.log(UNITS[item])
        if (Object.keys(UNITS[item]).map(v => v.toLowerCase()).includes(unit.toLowerCase())) {
            quantity = item
            return
        }
    })
    //console.log(quantity)
    return quantity
}

const quantityHasUnit = (quantity, unit) => {
    if (!unit) return null
    let res = false
    Object.keys(UNITS[quantity]).forEach(item => {
        if (item.toLocaleLowerCase() === unit.toLocaleLowerCase())
            res = true
    })
    return res
}

/**
 * Convert a mangitude in a given unit to the rest of units of the same quantity
 * @param {String} quantity - i.e. length
 * @param {Number} magnitude - i.e. 8
 * @param {String} unit - valid unit within the passed quantity, i.e. "m" (valid for quantity="length")
 * @returns {Object} with the original magnitude and unit (i.e. 8 m)
 * converted to all the units (i.e. m, cm, mm, km, in, ft, ...)
 * in the correspondent quantity (i.e. length)
 */
const convertUnit = ({ quantity, magnitude, unit }) => {
    let res = {}
    Object.keys(UNITS[quantity]).map(target => {
        //to = Object.keys(UNITS[quantity]).filter(k => k.toLowerCase() === to.toLowerCase())[0]
        res[target] = convertUnitTo({ quantity, magnitude, unit, target })
    })
    //console.log(res)
    return res
}

/**
 * Convert a magnitud from one unit to other (both units must belong to the same quantity, i.e. length)
 * @param {String} quantity
 * @param {Number} magnitude
 * @param {String} unit - original unit, valid for the passed quantity
 * @param {String} target - target unit, valid for the passed quantity
 * @param {Number} decimals
 * @returns {Number} magnitud in the target unit
 */
const convertUnitTo = ({ quantity, magnitude, unit, target, decimals = undefined }) => {
    // Convert a magnitude in a given unit to the another unit
    if (!decimals) decimals = DECIMALS
    let unitRef = getConversionForUnitCaseInsensitive(UNITS[quantity], unit)
    let unitTarget = getConversionForUnitCaseInsensitive(UNITS[quantity], target)

    let res

    if (typeof unitTarget === "function")
        res = unitTarget(magnitude, unit)
    else
        res = magnitude * unitTarget / unitRef

    //console.log('convertUnitTo()', res)
    res = res.toFixed(decimals)
    return res
}

const evalMathematicalExpression = s => {
    try {
        let r = eval(s)
        //console.log('eval()', typeof r, r)
        return !isNaN(r) ? r : null
    } catch (e) {
        return null
    }
}

const decomposeInput = input => {
    let magnitudeString = input.match(/^[0-9.\+\-\*\/\(\) ]+/)
    let arr, magnitude, unit, target

    if (!magnitudeString) {

        arr = input.split(' ').filter(v => v !== "")

    } else {

        magnitudeString = magnitudeString[0]
        magnitude = evalMathematicalExpression(magnitudeString)
        arr = input.split(magnitudeString).filter(v => v !== "").join(' ')
            .split(' ').filter(v => !["", " "].includes(v))

    }

    if (!arr) return null

    if (!Array.isArray(arr)) return null

    if (arr.length > 0)
        unit = arr[0]

    if (arr.length === 2)
        target = arr[1] === "" ? null : arr[1]

    else if (VALID_PREPOSITIONS.includes(arr[1]))
        target = arr[2] === "" ? null : arr[2]

    return { magnitudeString, magnitude, unit, target }
}

/**
 * Main function that reads the input and returns the unit conversions (if any)
 * @param {String} input 
 * @returns {Object} containing the equivalent quantities in the different units of that magnitude
 * i.e. { m: 1.1, cm: 110, mm: 1100 }
 */
const readInputConvertUnit = input => {

    let obj = decomposeInput(input)
    if (!obj) return { error: "Invalid input" }

    let { magnitude, unit, target } = obj

    if (!unit) return null

    let quantity = findQuantity(unit)
    if (!quantity) return null

    magnitude = [null, undefined].includes(magnitude) ? 1 : magnitude

    //console.log({ magnitudeString, magnitude, unit, target, quantity })
    if (!target)
        // Handle the different use cases
        return convertUnit({ quantity, magnitude, unit })

    if (!quantityHasUnit(quantity, target)) return { error: "Invalid target unit" }

    return { [target]: convertUnitTo({ quantity, magnitude, unit, target }) }

}

/**
 * Copy a value into the clipboard (equivalent to ctrl+c)
 * @param {String||Number} value 
 */
const copyToClipBoard = (value) => {
    // Create an auxiliary element, set the value, select and copy
    var dummy = document.createElement("input")
    document.body.appendChild(dummy)
    dummy.setAttribute("value", value)
    dummy.select()
    document.execCommand('copy')
    document.body.removeChild(dummy)
}

export { UNITS, readInputConvertUnit, copyToClipBoard }