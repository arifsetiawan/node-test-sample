{% extends "../template/base.swig" %}

{% block site-title %}Error{% endblock %}

{% block body %}
  <div>
    <h1>{{ meta.code }}</h1>
    <h3>{{ meta.message }}</h3>
  </div>
{% endblock %}