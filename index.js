window.$ = document.querySelector.bind(document)
window.$$ = $document.querySelectorAll.bind(document)

Node.prototype.on = window.on = function (name, fn) {
    this.addEventListener(name, fn)
}

NodeList.prototype.__proto__ = Array.prototype

NodeList.prototype.on = NodeList.prototype.addEventListener = function (name, fn) {
    this.forEach(function (elem, i) {
        elem.on(name, fn)
    })
}

if (!Object.prototype.watch) {
    Object.defineProperty(Object.prototype, 'watch', {
        enumerable: false,
        configurable: true,
        writable: false,
        value: function (prop, handler) {
            var
                oldval = this[prop],
                newval = oldval,
                getter = function () {
                    return newval
                },
                setter = function (val) {
                    oldval = newval
                    return newval = handler.call(this, prop, oldval, val)
                }

            if (delete this[prop]) {
                Object.defineProperty(this, prop, {
                    get: getter,
                    set: setter,
                    enumerable: true,
                    configurable: true
                })
            }
        }
    })
}

if (!Object.prototype.unwatch) {
    Object.defineProperty(Object.prototype, 'unwatch', {
        enumerable: false,
        configurable: true,
        writable: false,
        value: function (prop) {
            var val = this[prop]
            delete this[prop]
            this[prop] = val
        }
    })
}

function throwError(message) {
    return console.log(message)
}

export function getNode(selector, parent) {
    const targetNode = parent || document
    const node = targetNode.querySelector(selector)

    if (!node) {
        throwError(`${selector} not found in document.`)
    }

    return node
}


export function autoExpand(field) {
    field.style.height = 'inherit'

    let computed = window.getComputedStyle(field)
    let height = parseInt(computed.getPropertyValue('border-top-width'), 10) +
        parseInt(computed.getPropertyValue('padding-top'), 10) +
        field.scrollHeight +
        parseInt(computed.getPropertyValue('padding-bottom'), 10) +
        parseInt(computed.getPropertyValue('border-bottom-width'), 10);

    field.style.height = height + 'px'
}


export function setAttributes(el, attrs) {
    for (let key in attrs) {
        if (attrs.hasOwnProperty(key)) {
            el.setAttribute(key, attrs[key])
        }
    }
}

export function removeAttributes(els, attrs) {
    for (let el in els) {
        if (els.hasOwnProperty(el)) {
            el.removeAttribute(attrs)
        }
    }
}


export function addClass(el, className) {
    if (!(el instanceof HTMLElement)) {
        throwError('Not a valid HTML element.')
    }

    el.setAttribute(
        'class',
        el.className.split(' ').filter(cn => cn !== className).concat(className).join(' '),
    )
}

export function removeClass(el, className) {
    if (!(el instanceof HTMLElement)) {
        throwError('Not a valid HTML element.')
    }

    el.setAttribute(
        'class',
        el.className.split(' ').filter(cn => cn !== className).join(' '),
    )
}

export function toggleClass(el, className) {
    if (!(el instanceof HTMLElement)) {
        throwError('Not a valid HTML element.')
    }

    if (el.classList.contains(className)) {
        removeClass(el, className)
    } else {
        addClass(el, className)
    }

}

export function hasClass(elem, className) {
    return matches(elem, className)
}

export function siblings(el, callback) {
    return Array.prototype.filter.call(el.parentNode.children, child => {
        if (child !== el) callback(child)
    })
}

export function matches(el, selector) {
    const allMatches = (el.target.document || el.target.ownerDocument).querySelectorAll(selector)

    for (let i = 0; i < allMatches.length; i += 1) {
        let node = el.target

        while (node && node !== document.body) {
            if (node === allMatches[i]) {
                return node
            }

            node = node.parentNode
        }
    }

    return null
}

export function contains(str, el) {
    return !!~str.indexOf(el)
}


export function prependBefore(el, parent) {
    if (parent && el) {
        return parent.insertBefore(el, parent.firstChild)
    } else {
        return throwError(`${el} or ${parent} not found in document.`)
    }
}

export function appendChild(el, parent) {
    if (parent && el) {
        return parent.appendChild(el)
    } else {
        return throwError(`${el} or ${parent} not found in document.`)
    }
}

export function replaceWith(node, target) {
    if (target) {
        target.replaceWith(node)
        return node
    }
}

export function removeElement(el) {
    if (!el) {
        return throwError(`${el} not found in document.`)
    }

    el.remove()
}


export function dynamicListener(parent, event, selector, fn) {
    let element = $(parent)

    element.on(event, function (event) {
        let possibleTargets = element.querySelectorAll(selector)
        let target = event.target

        for (let i = 0, l = possibleTargets.length; i < l; i++) {
            let el = target
            let p = possibleTargets[i]

            while (el && el !== element) {
                if (el === p) {
                    return fn.call(p, event)
                }

                el = el.parentNode
            }
        }
    })
}

export function cloneNodeWithEvents(oElm, bDeep, bEvents) {
    var
        aInputSubElements,
        eNodeCopy,
        aNodeCopySubElements,
        n1,
        n2,
        allEvents = ['onabort', 'onbeforecopy', 'onbeforecut', 'onbeforepaste', 'onblur', 'onchange', 'onclick',
            'oncontextmenu', 'oncopy', 'ondblclick', 'ondrag', 'ondragend', 'ondragenter', 'ondragleave',
            'ondragover', 'ondragstart', 'ondrop', 'onerror', 'onfocus', 'oninput', 'oninvalid', 'onkeydown',
            'onkeypress', 'onkeyup', 'onload', 'onmousedown', 'onmousemove', 'onmouseout',
            'onmouseover', 'onmouseup', 'onmousewheel', 'onpaste', 'onreset', 'onresize', 'onscroll', 'onsearch', 'onselect', 'onselectstart', 'onsubmit', 'onunload'
        ]

    bDeep = bDeep || false
    bEvents = bEvents || false

    eNodeCopy = oElm.cloneNode(bDeep)

    if (bEvents) {
        aInputSubElements = oElm.getElementsByTagName('*')
        aNodeCopySubElements = eNodeCopy.getElementsByTagName('*')

        // The node root
        for (n2 = 0; n2 < allEvents.length; n2++) {
            if (oElm[allEvents[n2]]) {
                eNodeCopy[allEvents[n2]] = oElm[allEvents[n2]]
            }
        }

        for (n1 = 0; n1 < aInputSubElements.length; n1++) {
            for (n2 = 0; n2 < allEvents.length; n2++) {
                if (aInputSubElements[n1][allEvents[n2]]) {
                    aNodeCopySubElements[n1][allEvents[n2]] = aInputSubElements[n1][allEvents[n2]]
                }
            }
        }
    }

    return eNodeCopy
}

export function detectScrollPosition(element, isEndCallback) {
    'object' === typeof (element) && element.on('scroll', () => {
        if ((element.offsetWidth + element.scrollLeft) === element.scrollWidth) {
            window.requestAnimationFrame(detectScrollPosition)
            return 'function' === typeof (isEndCallback) && isEndCallback(element)
        }
    })
}

export function emitEvent(type, elem, detail) {
    if (!type) return;

    elem = elem || window
    detail = detail || {}

    let event = new CustomEvent(type, {
        bubbles: true,
        cancelable: true,
        detail: detail
    })

    elem.dispatchEvent(event)
}


export function observer(element, options, callback) {
    let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
    let config = options || {
        attributes: true,
        attributeFilter: ['class'],
        attributeOldValue: false,
        childList: false,
        characterData: false,
        characterDataOldValue: false,
        subtree: false
    }
    let observer = new MutationObserver(mutations => {
        callback(mutations, element)
    })

    observer.observe(element, config)
}


export function buildQuery(data) {
    if (typeof (data) === 'string') return data
    let query = []

    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        }
    }

    return query.join('&')
}


export function getParents(elem, selector) {
    let parents = []

    while (elem && elem !== document) {
        if (selector) {
            if (elem.matches(selector)) {
                parents.push(elem)
            }
        } else {
            parents.push(elem)
        }

        elem = elem.parentNode
    }

    return parents
}

export function getParentsUntil(elem, parent, filter) {
    let parents = []

    while (elem && elem !== document) {
        if (parent) {
            if (elem.matches(parent)) break
        }

        if (filter) {
            if (elem.matches(filter)) {
                parents.push(elem)
            }
            continue
        }

        parents.push(elem)
        elem = elem.parentNode
    }

    return parents
}

export function getOffsetTop(element) {
    let offsetTop = 0

    while (element) {
        offsetTop += element.offsetTop
        element = element.offsetParent
    }

    return offsetTop
}

export function getOffsetLeft(element) {
    let offsetLeft = 0

    while (element) {
        offsetLeft += element.offsetLeft
        element = element.offsetParent
    }

    return offsetLeft
}

export function childrenMatches(elem, selector) {
    return Array.prototype.filter.call(elem.children, child => {
        return child.matches(selector)
    })
}

export function getSiblings(elem) {
    return Array.prototype.filter.call(elem.parentNode.children, sibling => {
        return sibling !== elem
    })
}

export function getNextSibling(elem, selector) {
    let sibling = elem.nextElementSibling

    if (!selector) return sibling

    while (sibling) {
        if (sibling.matches(selector)) return sibling
        sibling = sibling.nextElementSibling
    }
}

export function getPreviousSibling(elem, selector) {
    let sibling = elem.previousElementSibling

    if (!selector) return sibling

    while (sibling) {
        if (sibling.matches(selector)) return sibling
        sibling = sibling.previousElementSibling
    }
}

export function getNextUntil(elem, selector) {
    let siblings = []
    let next = elem.nextElementSibling

    while (next) {
        if (selector && next.matches(selector)) break
        siblings.push(next)
        next = next.nextElementSibling
    }

    return siblings
}

export function getPreviousUntil(elem, selector) {
    let siblings = []
    let prev = elem.previousElementSibling

    while (prev) {
        if (selector && prev.matches(selector)) break
        siblings.push(prev)
        prev = prev.previousElementSibling
    }

    return siblings
}

export function nextUntil(elem, selector, filter) {
    let siblings = []

    elem = elem.nextElementSibling

    while (elem) {
        if (elem.matches(selector)) break

        if (filter && !elem.matches(filter)) {
            elem = elem.nextElementSibling
            continue
        }

        siblings.push(elem)
        elem = elem.nextElementSibling
    }

    return siblings
}

export function getNextSiblings(el, filter) {
    let siblings = []
    while (el = el.nextSibling) {
        if (!filter || filter(el)) siblings.push(el)
    }
    return siblings
}

export function getPreviousSiblings(el, filter) {
    let siblings = []
    while (el = el.previousSibling) {
        if (!filter || filter(el)) siblings.push(el)
    }
    return siblings
}


export function isVisible(e) {
    return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
}

export function isHidden(elem) {
    return !isVisible(elem)
}


export function decodeHTML(html) {
    let txt = document.createElement('textarea')
    txt.innerHTML = html

    return txt.value
}

export function sanitizeHTML(str) {
    let temp = document.createElement('div')
    temp.textContent = str

    return temp.innerHTML
}

export function serialize(form) {
    let serialized = []

    for (let i = 0; i < form.elements.length; i++) {
        let field = form.elements[i]

        if (
            !field.name ||
            field.disabled ||
            field.type === 'file' ||
            field.type === 'reset' ||
            field.type === 'submit' ||
            field.type === 'button'
        ) continue

        if (field.type === 'select-multiple') {
            for (let n = 0; n < field.options.length; n++) {
                if (!field.options[n].selected) continue
                serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[n].value))
            }
        } else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
            serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value))
        }
    }

    return serialized.join('&')
}


export function addToObject(obj, key, value, index) {
    let temp = {}
    let i = 0

    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            if (i === index && key && value) {
                temp[key] = value
            }

            temp[prop] = obj[prop]

            i++
        }
    }

    if (!index && key && value) {
        temp[key] = value
    }

    return temp
}

export function arrayUnique(arr) {
    return arr.filter((item, index) => {
        return arr.indexOf(item) >= index
    })
}

export function serializeArray(form) {
    let serialized = []

    for (let i = 0; i < form.elements.length; i++) {
        let field = form.elements[i]

        if (
            !field.name ||
            field.disabled ||
            field.type === 'file' ||
            field.type === 'reset' ||
            field.type === 'submit' ||
            field.type === 'button'
        ) continue

        if (field.type === 'select-multiple') {
            for (let n = 0; n < field.options.length; n++) {
                if (!field.options[n].selected) continue

                serialized.push({
                    name: field.name,
                    value: field.options[n].value
                })
            }
        } else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
            serialized.push({
                name: field.name,
                value: field.value
            })
        }
    }

    return serialized
}

export function dedupe(arr) {
    return arr.filter(function (item, index) {
        return arr.indexOf(item) === index
    })
}

export function copy(obj) {
    return JSON.parse(JSON.stringify(obj))
}

export function shuffle(array) {
    let currentIndex = array.length
    let temporaryValue, randomIndex

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1

        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
    }

    return array
}

export function deepMerge() {
    let newObj = {}

    let merge = obj => {
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                if (Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                    newObj[prop] = deepMerge(newObj[prop], obj[prop])
                } else {
                    newObj[prop] = obj[prop]
                }
            }
        }
    }

    for (let i = 0; i < arguments.length; i++) {
        merge(arguments[i])
    }

    return newObj
}

export function isEqual(value, other) {
    let type = Object.prototype.toString.call(value)

    if (type !== Object.prototype.toString.call(other)) return false

    if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false

    let valueLen = type === '[object Array]' ? value.length : Object.keys(value).length
    let otherLen = type === '[object Array]' ? other.length : Object.keys(other).length

    if (valueLen !== otherLen) return false

    let compare = (item1, item2) => {
        let itemType = Object.prototype.toString.call(item1)

        if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
            if (!isEqual(item1, item2)) return false
        } else {
            if (itemType !== Object.prototype.toString.call(item2)) return false

            if (itemType === '[object Function]') {
                if (item1.toString() !== item2.toString()) return false
            } else {
                if (item1 !== item2) return false
            }

        }
    }

    if (type === '[object Array]') {
        for (let i = 0; i < valueLen; i++) {
            if (compare(value[i], other[i]) === false) return false
        }
    } else {
        for (let key in value) {
            if (value.hasOwnProperty(key)) {
                if (compare(value[key], other[key]) === false) return false
            }
        }
    }

    return true
}

export function isPlainObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}

export function objectFilter(obj, callback) {
    let filtered = {}

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (callback(obj[key], key, obj)) {
                filtered[key] = obj[key]
            }
        }
    }

    return filtered
}

export function pick(obj, props) {
    if (!obj || !props) return

    let picked = {}

    props.forEach(prop => {
        picked[prop] = obj[prop]
    })

    return picked
}

export function put(obj, path, val) {
    const stringToPath = path => {
        if (typeof path !== 'string') return path

        var output = []

        path.split('.').forEach((item, index) => {
            item.split(/\[([^}]+)\]/g).forEach(key => {
                if (key.length > 0) {
                    output.push(key)
                }

            })
        })

        return output
    }

    path = stringToPath(path)

    var length = path.length
    let current = obj

    path.forEach((key, index) => {
        let isArray = key.slice(-2) === '[]'

        key = isArray ? key.slice(0, -2) : key

        if (isArray && Object.prototype.toString.call(current[key]) !== '[object Array]') {
            current[key] = []
        }

        if (index === length - 1) {
            if (isArray) {
                current[key].push(val)
            } else {
                current[key] = val
            }
        } else {
            if (!current[key]) {
                current[key] = {}
            }

            current = current[key]
        }
    })
}

export function trueTypeOf(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}


export function debounce(delay, atBegin, callback) {
    return callback === undefined ? throttle(delay, atBegin, false) : throttle(delay, callback, atBegin !== false)
}

export function throttle(delay, noTrailing, callback, debounceMode) {
    let timeoutID
    let cancelled = false
    let lastExec = 0

    function clearExistingTimeout() {
        if (timeoutID) {
            clearTimeout(timeoutID)
        }
    }

    function cancel() {
        clearExistingTimeout()
        cancelled = true
    }

    if (typeof noTrailing !== 'boolean') {
        debounceMode = callback
        callback = noTrailing
        noTrailing = undefined
    }

    function wrapper() {

        let self = this
        let elapsed = Date.now() - lastExec
        let args = arguments

        if (cancelled) {
            return
        }

        function exec() {
            lastExec = Date.now()
            callback.apply(self, args)
        }

        function clear() {
            timeoutID = undefined
        }

        if (debounceMode && !timeoutID) {
            exec()
        }

        clearExistingTimeout()

        if (debounceMode === undefined && elapsed > delay) {
            exec()

        } else if (noTrailing !== true) {
            timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay)
        }

    }

    wrapper.cancel = cancel

    return wrapper
}

export function switcher(cases) {
    function noop() {}

    cases = cases || {}
    return function switchFn(value) {
        return (cases[value] || cases.default || noop)(value)
    }
}

export function resizeListener(eventName) {
    const throttle = (type, name, obj) => {
        obj = obj || window
        let running = false

        const func = () => {
            if (running) return
            running = true

            requestAnimationFrame(() => {
                obj.dispatchEvent(new CustomEvent(name))
                running = false
            })
        }

        obj.addEventListener(type, func)
    }

    return throttle('resize', eventName)
}

export function responsiveWatch({
    sizes = [],
    orientations = true,
    medias = false,
    queries = {},
    check = true
}, cb) {
    const units = ['px', 'em', 'rem', 'ex', 'ch', 'mm', 'cm', 'in', 'pt', 'pc']

    if (!Array.isArray(sizes)) {
        throw new Error('options.sizes must be an array')
    } else if (sizes.length === 1) {
        throw new Error('If you specify some sizes, you need at least two of them.')
    }

    if (check) {
        sizes.forEach((size, index) => {
            if (typeof size.name !== 'string') {
                throw new Error(`Size names must be string. Invalid: ${size.name}`)
            }

            if (index < sizes.length - 1) {
                if (typeof size.breakpoint !== 'number') {
                    throw new Error(`Size [${size.name}] must have a number breakpoint. Invalid: ${size.breakpoint}`)
                } else if (units.indexOf(size.unit) < 0) {
                    throw new Error(`Size [${size.name}] doesn't have a valid unit. Invalid: ${size.unit}`)
                } else if (size.breakpoint <= 0) {
                    throw new Error(`Size [${size.name}] must have a strictly positive breakpoint. Invalid: ${size.unit}`)
                }
            } else {
                if (size.breakpoint !== undefined || size.unit !== undefined) {
                    throw new Error('You must not define neither breakpoint nor unit for the last size')
                }
            }
        })

        for (let i = 1, l = sizes.length - 1; i < l; ++i) {
            const previous = sizes[i - 1],
                current = sizes[i];
            if (current.unit !== previous.unit) {
                break;
            } else if (current.breakpoint <= previous.breakpoint) {
                throw new Error('Each breakpoint must be bigger than the previous one.');
            }
        }

        if (typeof orientations !== 'boolean') {
            throw new Error('options.orientations must be a boolean');
        }

        if (typeof medias !== 'boolean') {
            throw new Error('options.medias must be a boolean');
        }

        if (typeof cb !== 'function') {
            throw new Error('callback must be a function');
        }
    }

    let currentStatus

    function callback() {
        currentStatus = status()
        cb(currentStatus)
    }

    const watchers = {
        sizes: {},
        orientations: {},
        medias: {},
        queries: {}
    }

    sizes.forEach((size, index) => {
        let min, minUnit, max, maxUnit

        if (index > 0) {
            min = sizes[index - 1].breakpoint
            minUnit = sizes[index - 1].unit
        }

        if (index < sizes.length - 1) {
            max = size.breakpoint
            maxUnit = size.unit

            switch (maxUnit) {
                case 'cm':
                case 'in':
                    max -= 0.01
                    break
                case 'em':
                case 'rem':
                case 'ex':
                case 'ch':
                case 'mm':
                case 'pt':
                case 'pc':
                    max -= 0.1
                    break
                default:
                    max -= 1
            }
        }

        let query = ''
        if (min !== undefined) {
            query += `(min-width: ${min}${minUnit})`
        }
        if (max !== undefined) {
            if (query !== '') {
                query += ' and '
            }
            query += `(max-width: ${max}${maxUnit})`
        }

        watchers.sizes[size.name] = matchMedia(query)
        watchers.sizes[size.name].addListener(callback)
    })

    if (orientations) {
        watchers.orientations.landscape = matchMedia('(orientation: landscape)')
        watchers.orientations.landscape.addListener(callback)

        watchers.orientations.portrait = matchMedia('(orientation: portrait)')
        watchers.orientations.portrait.addListener(callback)
    }

    if (medias) {
        const medias = ['braille', 'embossed', 'handheld', 'print', 'projection', 'screen', 'speech', 'tty', 'tv']

        medias.forEach(media => {
            watchers.medias[media] = matchMedia(media)
            watchers.medias[media].addListener(callback)
        })
    }

    Object.keys(queries).forEach(query => {
        watchers.queries[query] = matchMedia(queries[query])
        watchers.queries[query].addListener(callback)
    })

    const keys = {}

    Object.keys(watchers).forEach(level1 => {
        const level2 = Object.keys(watchers[level1])
        if (level2.length > 0) {
            keys[level1] = level2
        }
    })

    const sizesHash = {}

    sizes.forEach(size => {
        sizesHash[size.name] = size
    })

    function matchSizes(result, sizes) {
        return sizes.reduce((acc, size) => acc || result.sizes[size.name], false)
    }

    const sizeUtils = {
        gt: (result, size) => matchSizes(result, sizes.slice(sizes.indexOf(size) + 1)),
        gte: (result, size) => matchSizes(result, sizes.slice(sizes.indexOf(size))),
        lt: (result, size) => matchSizes(result, sizes.slice(0, sizes.indexOf(size))),
        lte: (result, size) => matchSizes(result, sizes.slice(0, sizes.indexOf(size) + 1))
    }

    function status() {
        const result = {}

        Object.keys(keys).forEach(level1 => {
            keys[level1].forEach(level2 => {
                if (!result[level1]) {
                    result[level1] = {}
                }

                result[level1][level2] = watchers[level1][level2].matches
            })
        })

        if (keys.sizes.length > 1) {
            ['gt', 'gte', 'lt', 'lte'].forEach(comp => {
                keys.sizes.forEach(sizeName => {
                    if (!result[comp]) {
                        result[comp] = {}
                    }

                    result[comp][sizeName] = sizeUtils[comp](result, sizesHash[sizeName])
                })
            })
        }

        return result
    }

    callback()

    return {
        status: () => currentStatus
    }
}

export function scrollStop(callback) {
    if (!callback || typeof callback !== 'function') return

    let isScrolling

    window.on('scroll', event => {
        window.clearTimeout(isScrolling)

        isScrolling = setTimeout(() => {
            callback()
        }, 66)
    }, false)
}


export function isInViewport(elem) {
    let distance = elem.getBoundingClientRect()

    return (
        distance.top >= 0 &&
        distance.left >= 0 &&
        distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        distance.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
}

export function isOutOfViewport(elem) {
    var bounding = elem.getBoundingClientRect()
    var out = {}

    out.top = bounding.top < 0
    out.left = bounding.left < 0
    out.bottom = bounding.bottom > (window.innerHeight || document.documentElement.clientHeight)
    out.right = bounding.right > (window.innerWidth || document.documentElement.clientWidth)
    out.any = out.top || out.left || out.bottom || out.right
    out.all = out.top && out.left && out.bottom && out.right

    return out
}


export function placeholders(template, data) {
    template = typeof (template) === 'function' ? template() : template
    if (['string', 'number'].indexOf(typeof template) === -1) throw 'Please provide a valid template'

    if (!data) return template

    template = template.replace(/\{\{([^}]+)\}\}/g, match => {
        match = match.slice(2, -2)

        let sub = match.split('.')

        if (sub.length > 1) {
            let temp = data

            sub.forEach(item => {
                if (!temp[item]) {
                    temp = '{{' + match + '}}'
                    return
                }
                temp = temp[item]
            })

            return temp
        } else {
            if (!data.hasOwnProperty(match)) return '{{' + match + '}}'
            return data[match]
        }

    })

    return template
}
// https://codepen.io/cferdinandi/pen/ejrEGQ?editors=1010

export function autocomplete(inp, arr) {
    let currentFocus

    inp.addEventListener('input', function (e) {
        let a, b, i, val = this.value

        closeAllLists()

        if (!val) return false

        currentFocus = -1

        a = document.createElement('div')
        a.setAttribute('id', this.id + '-autocomplete-list')
        a.setAttribute('class', 'app-search--result')

        this.parentNode.appendChild(a)

        for (i = 0; i < arr.length; i++) {
            let title = arr[i].title
            let href = title.split(' ').join('-')

            if (title.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                b = document.createElement('a')

                b.setAttribute('href', `#${href}`)
                b.innerHTML = `<strong>${title.substr(0, val.length)}</strong>`
                b.innerHTML += title.substr(val.length);
                b.innerHTML += `<input type='hidden' value='${title}'>`

                b.addEventListener('click', function (e) {
                    e.preventDefault()
                    inp.value = this.getElementsByTagName('input')[0].value
                    closeAllLists()
                })

                a.appendChild(b)
            }
        }
    })

    inp.addEventListener('keydown', function (e) {
        let x = document.getElementById(this.id + '-autocomplete-list')

        if (x) x = x.getElementsByTagName('a')

        if (e.keyCode == 40) {
            currentFocus++
            addActive(x)
        } else if (e.keyCode == 38) {
            currentFocus--
            addActive(x)
        } else if (e.keyCode == 13) {
            e.preventDefault()
            if (currentFocus > -1) {
                if (x) x[currentFocus].click()
            }
        }
    })

    function addActive(x) {
        if (!x) return false

        removeActive(x)

        if (currentFocus >= x.length) currentFocus = 0
        if (currentFocus < 0) currentFocus = (x.length - 1)

        x[currentFocus].classList.add('autocomplete-active')
    }

    function removeActive(x) {
        for (let i = 0; i < x.length; i++) {
            x[i].classList.remove('autocomplete-active')
        }
    }

    function closeAllLists(elmnt) {
        let x = document.getElementsByClassName('app-search--result')

        for (let i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i])
            }
        }
    }

    document.addEventListener('click', function (e) {
        closeAllLists(e.target)
    })
}

export function ready(fn) {
    if (typeof fn !== 'function') return

    if (document.readyState === 'interactive' || document.readyState === 'complete') {
        return fn()
    }

    document.on('DOMContentLoaded', fn, false)
}

export function connect (route) {
    const get = endpoint => {
        return fetch(`${route}/${endpoint}`)
    }

    const post = (endpoint, params) => {
        return fetch(`${route}/${endpoint}`, {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
    }

    return {
        get,
        post
    }
}

export function scrollFix(options) {
    let defaults = {
        element: '',
        className: ''
    }

    let settings = Object.assign({}, defaults, options)

    try {
        let header = $(settings.element)

        if (typeof header !== 'undefined' && header !== null) {
            let height = header.offsetTop + header.offsetHeight

            window.onscroll = () => {
                if (window.pageYOffset > height) {
                    header.classList.add(settings.className)
                } else {
                    header.classList.remove(settings.className)
                }
            }
        } else {
            throwError(header, 'undefined or null')
        }
    } catch (error) {
        throwError(error)
    }
}

export function simpleTab(element, activeClass) {
    if (!$(element)) return

    $(element).on('click', onTabClick, false)

    function onTabClick(event) {
        event.preventDefault()

        let parent = event.target.parentElement
        let hash = event.target.href.split('#')[1]

        replaceClassName(parent, activeClass)
        replaceClassName(document.getElementById(hash), activeClass)
    }

    function replaceClassName (element, className) {
        addClass(element, className)
        siblings(element, _self => {
            removeClass(_self, className)
        })
    }
}

export function activeByPage (menu, activeClass) {
    let navMenu = $(menu) || throwError(menu, 'not defined')
    
    if (!navMenu) return

    let menuitems = navMenu.children

    for (const key in menuitems) {
        if (menuitems.hasOwnProperty(key)) {
            const item = menuitems[key]

            if (item.href === location.href) {
                item.className = activeClass
            }
        }
    }
}


export function truncate(elem, limit, after) {
    if (!elem || !limit) return

    let content = elem.textContent.trim()
    content = content.split(' ').slice(0, limit)
    content = content.join(' ') + (after ? after : '')
    elem.textContent = content
}

export function memoize(fn) {
    const cache = new Map()

    return value => {
        const cachedResult = cache.get(value)

        if (cachedResult !== undefined) return cachedResult

        const result = fn(value)
        cache.set(value, result)

        return result
    }
}

export function shank(arr, index = 0, delCount = 0, ...elements) {
    return arr.slice(0, index).concat(elements).concat(arr.slice(index + delCount))
}

export function objectFromPairs (arr) {
    return arr.reduce((a, [key, val]) => ((a[key] = val), a), {})
}
