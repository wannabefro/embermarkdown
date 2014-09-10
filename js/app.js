var marked = require('marked');
App = Ember.Application.create();

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return {
      body: ""
    }
  }
});

App.IndexView = Ember.View.extend({
  editor: null,
  didInsertElement: function() {
    this.editor = ace.edit("editor");
    this.editor.getSession().setMode("ace/mode/markdown");
    $('.ace_text-input').focus();

    marked.setOptions({
      gfm: true,
      breaks: true,
      highlight: function (code) {
        return require('highlight.js').highlightAuto(code).value;
      }
    });
  },
  keyUp: function() {
    this.get('controller').set('body', this.editor.getValue());
  }
});

App.IndexController = Ember.ObjectController.extend({
  renderedMarkdown: function() {
    var markdown = marked(this.get('body'));
    return markdown;
  }.property('body')
});
