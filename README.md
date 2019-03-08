# Utilies

Utilities for every web app needed

### Public Methods

````js
    getNode(selector, parent)
    // no need document.querySelector or any similars. 
    // just type selector name. 
    // parent is optional
````

````js
    autoExpand(field)
    // (getNode('textarea'))
````

````js
    setAttributes(el, attrs)
    // (getNode('.el'), 'data-role="blah"')
````

````js
    removeAttributes(els, attrs)
    // similar to setAttributes
````

````js
    addClass(el, className)
    // (getNode('.el'), 'active')
````

````js
    removeClass(el, className)
    // (getNode('.el'), 'active')
````

````js
    toggleClass(el, className)
    // (getNode('.el'), 'active')
````

````js
    hasClass(elem, className)
    // (getNode('.el'), 'active')
````

````js
    siblings(el, callback)
    // (getNode(el), self => { ... })
````

````js
    matches(el, selector)
    // (getNode('.el'), '.className')
````

````js
    contains(str, el)
    // ('haystack', 'needle')
````

````js
    prependBefore(el, parent)
    // (getNode('.el'), getNode('.parent'))
````

````js
    appendChild(el, parent)
    // (getNode('.el'), getNode('.parent'))
````

````js
    replaceWith(node, target)
    // (HTMLNode, getNode('.target'))
````

````js
    removeElement(el)
    // (getNode('.el'))
````

````js
    dynamicListener(parent, event, selector, fn)
    // ('body', 'click', '.el', event => { ... })
````

````js
    cloneNodeWithEvents(oElm, bDeep, bEvents)
    // (HTMLElement, boolean, boolean)
    // bDeep and bEvents optional
````

````js
    detectScrollPosition(element, isEndCallback)
    // (getNode('.el'), self => { ... })
````

````js
    emitEvent(type, elem, detail)
    // ('click', getNode('.el'), event => { ... })
````

````js
    const obs = observer(element, options, console.log) // Logs all mutations that happen on the page
    obs.disconnect()
    // (getNode('.el'), { attributeFilter: ['data-target'] }, (mutation) => { ... })
````

````js
    buildQuery(data)
    // ('string or anything')
````

````js
    getParents(elem, selector)
    // (getNode('.el'), '.active')
````

````js
    getParentsUntil(elem, parent, filter)
    // (getNode('.el'), '.parent', '.filterClass')
````

````js
    getOffsetTop(element)
    // (getNode('.el'))
````

````js
    getOffsetLeft(element)
    // (getNode('.el'))
````

````js
    childrenMatches(elem, selector)
    // (getNode('.el'), '.active')
````

````js
    getSiblings(elem)
    // (getNode('.el'))
````

````js
    getNextSibling(elem, selector)
    // (getNode('.el'), '.active')
````

````js
    getPreviousSibling(elem, selector)
    // (getNode('.el'), '.active')
````

````js
    getNextUntil(elem, selector)
    // (getNode('.el'), '.active')
````

````js
    getPreviousUntil(elem, selector)
    // (getNode('.el'), '.active')
````

````js
    nextUntil(elem, selector, filter)
    // (getNode('.el'), '.active', '.filterClass')
````

````js
    getNextSiblings(el, filter)
    // (getNode('.el'), '.filterClass')
````

````js
    getPreviousSiblings(el, filter)
    // (getNode('.el'), '.filterClass')
````

````js
    isVisible(el)
    // (getNode('.el'))
````

````js
    isHidden(el)
    // (getNode('.el'))
````

````js
    decodeHTML(htmlNode)
    // let data = '<div><p></p></div>'
    // (data)
````

````js
    sanitizeHTML(htmlNode)
    // let data = '<div><p></p></div>'
    // (data)
````

````js
    addToObject(obj, key, value, index)
    // (myObj, 'KEY', 'VALUE', 1)
````

````js
    arrayUnique(arr)
    // (myArray)
    // it's return true or false
````

````js
    serializeArray(form)
    // (getNode('.formElement'))
    // it's return array
````

````js
    dedupe(arr)
    // (myArray)
    // it's return true or false
````

````js
    copy(obj)
    // (myObject)
    // it's return new Object
````

````js
    shuffle(array)
    // (myArray)
    // be careful! it's mutate given array than return
````

````js
    deepMerge()
    // (obj1, obj2, obj3, ...)
    // it's return new Object
    // more reading: https://gomakethings.com/merging-objects-with-vanilla-javascript/
````

````js
    isEqual(value, other)
    // (var1, var2)
    // it's return true or false
````

````js
    isPlainObject(obj)
    // (object)
    // it's return true or false
````

````js
    objectFilter(obj, callback)
    // (myObject, () => { ... })
    // it's return new Object
````

````js
    pick(obj, props)
    // (object, 'key')
    // it's return new Object
````

````js
    put(obj, path, val)
    // (myObject, 'val.subval', 'lorem ipsum')
    // more reading: https://gomakethings.com/adding-items-to-an-object-at-a-specific-path-with-vanilla-js/
````

````js
    trueTypeOf(obj)
    // (myObject)
    // it's return more accurately check the type of a object
````

````js
    debounce(delay, atBegin, callback)
    throttle(delay, noTrailing, callback, debounceMode)
    // thanks for niksy
    // for usage and detailed explanations: https://github.com/niksy/throttle-debounce
````

````js
    switcher(cases)
    // for usage and detailed explanations: https://github.com/laphilosophia/switch-fn
````

````js
    resizeListener(eventName)
    // ('optimizedResize')
    // window.on('optimizedResize', event => {
    //     let screen = event.target.screen
    //     let width = event.target.innerWidth
    //
    //     ...
    // }))
````

````js
    responsiveWatch({sizes, orientations, medias, queries, check}, cb)
    // usage: https://github.com/pauldijou/responsive-watch
````

````js
    scrollStop(callback)
    // (() => { ... })
    // it's return your callback function
````

````js
    isInViewport(elem)
    // (getNode('.el'))
    // it's return true or false
````

````js
    isOutOfViewport(elem)
    // (getNode('.el'))
    // it's return true or false
````

````js
    placeholders(template, data)
    // usage: https://codepen.io/cferdinandi/pen/ejrEGQ?editors=1010
````

````js
    autocomplete(input, array)
    // let api = connect('/myApiRoute')
    // api.get('posts').then(res => res.json()).then(res => {
    //    autocomplete(getNode('.searchInput'), res)
    // })
````

````js
    ready(fn)
    // (event => { ... })
    // similar to window.addEventListener(event => { ... })
    // but shorter version..
````

````js
    connect (route)
    // let api = connect('/myApiRoute')
````

````js
    scrollFix(options)
    // ({ element: '', className: '' })
    // when body scrolled, add given class to given element
````

````js
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
````

````js
    activeByPage (menu, activeClass)
    // ('#navigation', 'active') ~ that's it
````

````js
    truncate(elem, limit, after)
    // (getNode('.el'), 30, '...')
````

````js
    memoize(fn)
    // const myFunc = (p, a) => { ... }
    // let memo = memoize(myFunc)
    // memo('lorem', 'ipsum')
    // memo('lorem', 'ipsum') ~ and voila!
````

````js
    shank(arr, index, delCount, elements)
    // const names = ['alpha', 'bravo', 'charlie']
    // const namesAndDelta = shank(names, 1, 0, 'delta') // [ 'alpha', 'delta', 'bravo', 'charlie' ]
    // const namesNoBravo = shank(names, 1, 1) // [ 'alpha', 'charlie' ]
    // console.log(names) // ['alpha', 'bravo', 'charlie']
````

````js
    objectFromPairs(array)
    // ([['a', 1], ['b', 2]]) -> ({ a: 1, b: 2 })
````
