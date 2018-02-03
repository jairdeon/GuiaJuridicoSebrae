<script>
var locations = (function () {
var locations = null;
$.ajax({
    'async': false,
    'global': false,
    'url': '<?php echo base_url(); ?>/api/get_business/<?php echo $cnpj; ?>',
    'dataType': "json",
    'success': function (data) {
        locations = data;
    }
});
return locations;
})();


$("#map_canvas_company").each(function() {
$(this).goMap({
  maptype: 'ROADMAP',
  scrollwheel: false,
  navigationControl: false,
  zoom: 14,
  markers: locations
});
});
</script>