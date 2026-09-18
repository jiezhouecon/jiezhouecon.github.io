---
layout: page
permalink: /teaching/
title: teaching
description:
nav: true
nav_order: 6
---

<div class="courses">
{% for course in site.courses %}
  <h3><a href="{{ course.url | relative_url }}">{{ course.title }}</a></h3>
  {% include course_meta.liquid course=course %}
  {% if course.description %}
    <p>{{ course.description }}</p>
  {% endif %}
{% endfor %}
</div>
