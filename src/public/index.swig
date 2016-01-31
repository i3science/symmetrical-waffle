<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>SMP</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.3/css/materialize.min.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="/assets/css/bundle.css">
</head>
<body class="grey lighten-3">
    <div id="main">{% autoescape false %}{{ content }}{% endautoescape %}</div>
    <script type="text/javascript">
        window.translations = {% autoescape false %}{{ translations }}{% endautoescape %};
    </script>
    <script src="https://code.jquery.com/jquery-2.1.4.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.3/js/materialize.min.js"></script>
    <script src="/assets/bundle.js"></script>
    {% if process.env.NODE_ENV === 'development' %}
    <script>
        document.write('<script src="//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')
        $(".button-collapse").sideNav();

        $(document).ready(function() {
            $('select').material_select();
            $('.expand').collapsible({accordion : false});
        });

    </script>
    {% endif %}
</body>
</html>