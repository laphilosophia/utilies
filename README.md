# Utilies

Utilities for every web app needed

### Public Methods
````
    getNode(selector, parent)
    // no need document.querySelector or any similars. 
    // just type selector name. 
    // parent is optional

    autoExpand(field)
    // (getNode('textarea'))

    setAttributes(el, attrs)
    // (getNode('.el'), 'data-role="blah"')

    removeAttributes(els, attrs)
    // similar to setAttributes

    addClass(el, className)
    // (getNode('.el'), 'active')

    removeClass(el, className)
    // (getNode('.el'), 'active')

    toggleClass(el, className)
    // (getNode('.el'), 'active')

    hasClass(elem, className)
    // (getNode('.el'), 'active')

    siblings(el, callback)
    // (getNode(el), self => { ... })

    matches(el, selector)
    // (getNode('.el'), '.className')

    contains(str, el)
    // ('haystack', 'needle')

    prependBefore(el, parent)
    // (getNode('.el'), getNode('.parent'))

    appendChild(el, parent)
    // (getNode('.el'), getNode('.parent'))

    replaceWith(node, target)
    // (HTMLNode, getNode('.target'))

    removeElement(el)
    // (getNode('.el'))

    dynamicListener(parent, event, selector, fn)
    // ('body', 'click', '.el', event => { ... })

    cloneNodeWithEvents(oElm, bDeep, bEvents)
    // (HTMLElement, boolean, boolean)
    // bDeep and bEvents optional

    detectScrollPosition(element, isEndCallback)
    // (getNode('.el'), self => { ... })

    emitEvent(type, elem, detail)
    // ('click', getNode('.el'), event => { ... })

    observer(element, options, callback)
    // (getNode('.el'), { attributeFilter: ['data-target'] }, (mutations, element) => { ... })

    buildQuery(data)
    // ('string or anything')

    getParents(elem, selector)
    // (getNode('.el'), '.active')

    getParentsUntil(elem, parent, filter)
    // (getNode('.el'), '.parent', '.filterClass')

    getOffsetTop(element)
    // (getNode('.el'))

    getOffsetLeft(element)
    // (getNode('.el'))

    childrenMatches(elem, selector)
    // (getNode('.el'), '.active')

    getSiblings(elem)
    // (getNode('.el'))

    getNextSibling(elem, selector)
    // (getNode('.el'), '.active')

    getPreviousSibling(elem, selector)
    // (getNode('.el'), '.active')

    getNextUntil(elem, selector)
    // (getNode('.el'), '.active')

    getPreviousUntil(elem, selector)
    // (getNode('.el'), '.active')

    nextUntil(elem, selector, filter)
    // (getNode('.el'), '.active', '.filterClass')

    getNextSiblings(el, filter)
    // (getNode('.el'), '.filterClass')

    getPreviousSiblings(el, filter)
    // (getNode('.el'), '.filterClass')

    isVisible(el)
    // (getNode('.el'))

    isHidden(el)
    // (getNode('.el'))

    decodeHTML(htmlNode)
    // let data = '<div><p></p></div>'
    // (data)

    sanitizeHTML(htmlNode)
    // let data = '<div><p></p></div>'
    // (data)

    addToObject(obj, key, value, index)
    // (myObj, 'KEY', 'VALUE', 1)

    arrayUnique(arr)
    // (myArray)
    // it's return true or false

    serializeArray(form)
    // (getNode('.formElement'))
    // it's return array

    dedupe(arr)
    // (myArray)
    // it's return true or false

    copy(obj)
    // (myObject)
    // it's return new Object

    shuffle(array)
    // (myArray)
    // be careful! it's mutate given array than return

    deepMerge()
    // (obj1, obj2, obj3, ...)
    // it's return new Object
    // more reading: https://gomakethings.com/merging-objects-with-vanilla-javascript/

    isEqual(value, other)
    // (var1, var2)
    // it's return true or false

    isPlainObject(obj)
    // (object)
    // it's return true or false

    objectFilter(obj, callback)
    // (myObject, () => { ... })
    // it's return new Object

    pick(obj, props)
    // (object, 'key')
    // it's return new Object

    put(obj, path, val)
    // (myObject, 'val.subval', 'lorem ipsum')
    // more reading: https://gomakethings.com/adding-items-to-an-object-at-a-specific-path-with-vanilla-js/

    trueTypeOf(obj)
    // (myObject)
    // it's return more accurately check the type of a object

    debounce(delay, atBegin, callback)
    throttle(delay, noTrailing, callback, debounceMode)
    // thanks for niksy
    // for usage and detailed explanations: https://github.com/niksy/throttle-debounce

    switcher(cases)
    // for usage and detailed explanations: https://github.com/laphilosophia/switch-fn

    resizeListener(eventName)
    // ('optimizedResize')
    // window.on('optimizedResize', event => {
    //     let screen = event.target.screen
    //     let width = event.target.innerWidth
    //
    //     ...
    // }))

    responsiveWatch({sizes, orientations, medias, queries, check}, cb)
    // usage: https://github.com/pauldijou/responsive-watch

    scrollStop(callback)
    // (() => { ... })
    // it's return your callback function

    isInViewport(elem)
    // (getNode('.el'))
    // it's return true or false

    isOutOfViewport(elem)
    // (getNode('.el'))
    // it's return true or false

    placeholders(template, data)
    // usage: https://codepen.io/cferdinandi/pen/ejrEGQ?editors=1010

    autocomplete(input, array)
    // let api = connect('/myApiRoute')
    // api.get('posts').then(res => res.json()).then(res => {
    //    autocomplete(getNode('.searchInput'), res)
    // })

    ready(fn)
    // (event => { ... })
    // similar to window.addEventListener(event => { ... })
    // but shorter version..

    connect (route)
    // let api = connect('/myApiRoute')

    scrollFix(options)
    // ({ element: '', className: '' })
    // when body scrolled, add given class to given element

    simpleTab(element, activeClass)
    // (getNode('#tab'), 'active')
    // 
    // html template 
    // <ul id="tab">
    //     <li class="active"><a href="tab-01"></a></li>
    //     <li><a href="tab-02"></a></li>
    //     <li><a href="tab-03"></a></li>
    // </ul>
    // <div>
    //     <div class="active" id="tab-01"></div>
    //     <div id="tab-02"></div>
    //     <div id="tab-03"></div>
    // </div>

    activeByPage (menu, activeClass)
    // ('#navigation', 'active') ~ that's it

    truncate(elem, limit, after)
    // (getNode('.el'), 30, '...')
````
