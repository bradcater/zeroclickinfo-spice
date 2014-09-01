(function(env) {
  // Taken from
  //   http://diveintohtml5.info/storage.html
  function supports_html5_storage() {
    "use strict";
    try {
      return "localStorage" in window && window["localStorage"] !== null;
    } catch (e) {
      return false;
    }
  }
  function add_todo(todo) {
    "use strict";
    var ddg_todo_elements_stored = 0;
    for (var key in localStorage) {
      if (key.search(/^ddg_spice_todo_element_/) === 0) {
        ddg_todo_elements_stored += 1;
      }
    }
    localStorage['ddg_spice_todo_element_' + (ddg_todo_elements_stored += 1)] = todo;
  }
  function remove_todo(key) {
    "use strict";
    var old_stored_keys = localStorage.length;
    localStorage.removeItem(key);
    var new_stored_keys = localStorage.length;
    var removed = (old_stored_keys > new_stored_keys);
    console.log('removed: ' + removed);
    if (removed) {
      var to_re_add = [];
      for (var key in localStorage) {
        if (key.search(/^ddg_spice_todo_element_/) === 0) {
          to_re_add.push(localStorage[key]);
          localStorage.removeItem(key);
        }
      }
      for (var i=0; i<to_re_add.length; i++) {
        add_todo(to_re_add[i]);
      }
    }
    return removed;
  }
  function clear_todo() {
    "use strict";
    localStorage.clear();
  }
  env.ddg_spice_todo = function(api_result) {
    "use strict";
    if (!supports_html5_storage()) {
      return Spice.failed('todo');
    }

    api_result = {};

    var q = DDG.get_query();

    if (q.search(/^todo add \S+/) === 0) {
      add_todo(q.replace(/^todo add /, ''));
      api_result.flash = 'Item added to to-do list.';
    } else if (q.search(/^todo remove \S+/) === 0) {
      var key_num = q.replace(/^todo remove /, '');
      if (remove_todo('ddg_spice_todo_element_' + key_num)) {
        api_result.flash = 'Item removed from to-do list.';
      } else {
        api_result.flash = key_num + ' was not found.';
      }
    } else if (q === 'todo clear') {
      clear_todo();
      api_result.flash = 'To-do list cleared.';
    }
    console.log(localStorage);

    api_result.todo = [];
    for (var key in localStorage) {
      console.log(key);
      if (key.search(/^ddg_spice_todo_element_/) === 0) {
        console.log(key + ' matches /^ddg_spice_todo_element_/');
        var key_num = parseInt(key.replace(/^ddg_spice_todo_element_/, ''));
        api_result.todo.push([key_num, localStorage[key]]);
      }
    }
    console.log(api_result.todo);
    api_result.todo.sort(function(a, b) {
      return (a[0] - b[0]);
    });
    console.log('api_result.todo');
    console.log(api_result.todo);
    api_result.has_elements = (api_result.todo.length > 0);
    console.log('api_result');
    console.log(api_result);

    Spice.add({
      id: "todo",
      name: "To-do List",
      data: api_result,
      meta: {
        itemType: 'To-do List',
        sourceName: 'Todo'
      },
      templates: {
        group: 'info',
        options: {
          content: Spice.todo.content
        }
      }
    });
  }
}(this));
