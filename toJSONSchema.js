const toJSONSchema = (() => {
  const types = {
    object: 'object',
    array: 'array',
    string: 'string',
    boolean: 'boolean',
    number: 'number',
    null: 'null',
  };

  const immutableTypes = {
    map: '@@__IMMUTABLE_MAP__@@',
    list: '@@__IMMUTABLE_LIST__@@',
    set: '@@__IMMUTABLE_SET__@@',
  };

  function traverse(stateNode) {
    const nodeIsImmutable = isImmutable(stateNode);
    const nodeValue = nodeIsImmutable
      ? stateNode.toJS()
      : stateNode;
    const schema = {
      type: getType(nodeValue),
      isImmutable: nodeIsImmutable,
    };

    if (schema.isImmutable) {
      schema.immutableType = getImmutableType(stateNode);
    }

    switch (schema.type) {
      case types.array:
        const item = nodeIsImmutable ? stateNode.get(0) : nodeValue[0];
        schema.items = traverse(item);
        break;
      case types.object:
        const entries = nodeIsImmutable
          ? [...stateNode.entries()]
          : Object.entries(nodeValue);

        schema.properties = entries.reduce((props, [key, val]) => {
          return {
            ...props,
            [key]: traverse(val),
          };
        }, {});
        break;
    }
    return schema;
  }

  function isImmutable(node) {
    if (!node) {
      return false;
    }

    return Object.values(immutableTypes).some(t => !!node[t]);
  }

  function getImmutableType(node) {
    const type = !!node['@@__IMMUTABLE_ORDERED__@@'] ? 'ordered_' : '';
    const typeEntries = Object.entries(immutableTypes);
    for (let i = 0; i < typeEntries.length; i++) {
      const [key, value] = typeEntries[i];
      if (node[value]) {
        return type + key;
      }
    }
    return type;
  }

  function getType(node) {
    const primitiveType = typeof node;
    if (primitiveType === 'object') {
      return getObjectType(node);
    }
    if (primitiveType === 'undefined') {
      return types.null;
    }
    return primitiveType;
  }

  function getObjectType(node) {
    if (node === null) {
      return types.null;
    }

    if (Array.isArray(node)) {
      return types.array;
    }

    return types.object;
  }

  function download(name, content) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', `${name}.json`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  function getDefaultStoreState() {
    if (elementHasStore(window.$r)) {
      return window.$r.props.store.getState();
    }
    const devTools = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (devTools && devTools.reactDevtoolsAgent) {
      const elements = [...devTools.reactDevtoolsAgent.elementData.values()];
      for (let i = 0; i < elements.length; i++) {
        const currentElement = elements[i];
        if (elementHasStore(currentElement)) {
          return currentElement.props.store.getState();
        }
      }
    }
    return null;
  }

  function elementHasStore(element) {
    return (
      element &&
      element.props &&
      element.props.store &&
      element.props.store.getState
    );
  }

  return (appName, stateObject = getDefaultStoreState()) => {
    if (!stateObject || typeof stateObject !== 'object') {
      console.error('State Object must be typeof object.');
      return null;
    }

    const schema = {
      '$schema': 'http://json-schema.org/draft-06/schema#',
      title: appName,
      ...traverse(stateObject),
    };

    download(appName, JSON.stringify(schema, undefined, 2));
    return schema;
  };
})();
