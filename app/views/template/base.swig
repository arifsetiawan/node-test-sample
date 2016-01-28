<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Node base app">
    <meta name="author" content="Nurul Arif Setiawan">

    <title>{% block title %}{% endblock %}</title>

    <link href="/bootstrap/dist/css/bootstrap.css" rel="stylesheet">
    <link href="/css/app.css" rel="stylesheet">

    {% block styles %}{% endblock %}
  </head>

  <body>

    <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="/">Node base app</a>
        </div>
        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li><a href="#">Home</a></li>
            <!--
            {% for menuItem in menu %}
              <li{% if menuItem.active %} class="active"{% endif %}><a href="{{menuItem.url}}">{{menuItem.displayName}}</a></li>
            {% endfor %}
            -->
          </ul>
        </div>
      </div>
    </div>

    <div class="container">

      {% block body %}{% endblock %}

      <hr>

      <div class="footer">
        <p>Node base app v.{{version}} &copy; Dycode 2016</p>
      </div>

    </div><!-- /.container -->

    <script src="/jquery/dist/jquery.min.js"></script>
    <script src="/bootstrap/dist/js/bootstrap.min.js"></script>

    {% block scripts %}{% endblock %}

  </body>
</html>