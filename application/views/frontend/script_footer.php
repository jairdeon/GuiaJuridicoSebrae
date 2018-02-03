<script>
var locations = (function () {
var locations = null;
$.ajax({
    'async': false,
    'global': false,
    'url': '<?php echo base_url(); ?>/api/all_business',
    'dataType': "json",
    'success': function (data) {
        locations = data;
    }
});
return locations;
})();


$("#map_canvas").each(function() {
$(this).goMap({
  maptype: 'ROADMAP',
  scrollwheel: false,
  navigationControl: false,
  zoom: 11,
  markers: locations
});
});
</script>