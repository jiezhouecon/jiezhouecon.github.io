---
layout: course
title: Empirical Research with Unstructured Data
# One-line subtitle under the title
description:
institution: Department of Economics, Yale University
# e.g. Fall 2026
term:
# Courses with a year are grouped under it on the Teaching page
year: 2026
# Thumbnail beside the entry: a file in assets/img/course_preview/ or a full URL
preview: monet-houses-of-parliament.jpg
# Badge beside the entry, e.g. PhD
level:
# e.g. Instructor
role:
# Links under the header; `url` is a full URL or a file placed in assets/pdf/
materials:
  - label: Syllabus
    url: "https://www.dropbox.com/scl/fi/ag7ds39gsyo2zh3c6w1uz/draft_ai_v2.pdf?rlkey=yswpdqp4ceomunhl2c7rktzkd&dl=1"
  - label: GitHub
    url: https://github.com/jiezhouecon/ai-in-economics-yale-f26
  - label: Lecture notes
    url: https://jiezhouecon.github.io/ai-in-economics-notes/
# Email sign-up row under the header, for course announcements. The address is
# POSTed to `action` in the form field named `field`; the row stays hidden until
# both are set. For a Google Form with a single short-answer "Email" question:
#   action: https://docs.google.com/forms/d/e/<FORM_ID>/formResponse
#   field: entry.<NUMBER>   (the id in the URL from the form's "Get pre-filled link")
signup:
  text: Get course announcements by email
  action: https://docs.google.com/forms/d/e/1FAIpQLSf5nzmmrvmCt42Nmfd5dcl65rA7GM8UaJb7GoEoS_A9YieFYQ/formResponse
  field: entry.1484836286
# One row per session, from the draft syllabus; `when` holds date, time and room,
# `materials` the session's links (same label/url form as above)
schedule:
  - week: 1
    topic: Latent Representations (Text Focused)
    when: Oct 30, 9–11 am, B120
    materials:
      - label: Slides
        url: https://jiezhouecon.github.io/ai-in-economics-notes/slides/lec1.pdf
      - label: Lecture notes
        url: https://jiezhouecon.github.io/ai-in-economics-notes/lec1.html
  - week: 2
    topic: LLM Agents
    when: Nov 13, 9–11 am, A106
  - week: 3
    topic: Econometric Problems, Interpretability, and (Imperfect) Solutions
    when: Nov 20, 9–11 am, B120
  - week: 4
    topic: "Beyond Text: Other Modalities"
    when: Dec 4, 9–11 am, B120
---

The world is unstructured. Empirical research has relied on data that arrives already structured into tables, but the majority of information about economic behavior is embedded in unstructured sources such as texts, audios, or images.

The course proceeds through four connected modules. The first focuses on textual analysis, for which current tools are the most advanced, and introduces latent representations of text, from bag-of-words and topic models to static and contextual language models. The second examines large language models and AI agents as tools for annotation, simulation, and synthetic data generation. The third focuses on econometric issues created by ML-generated variables, including measurement error and interpretability. The final module extends the discussion beyond text to images, networks, sequences, and multimodal models.

The goal of this course is not to train engineers who deploy machine learning systems, a task current AI tools make increasingly easy, but to become critical and effective users of these methods in empirical research. As economists, we bring a comparative advantage in understanding data-generating processes, defining meaningful constructs, and designing credible empirical strategies. This course is about connecting that advantage to modern machine learning methods for unstructured data, and we will do that work together.

_Given how fast-changing this field is, a lot of the research in this syllabus is still working papers and subject to change. Please be skeptical and critical about everything._

**Format:** 4 weeks × 2 hours per session (lecture + integrated lab).
