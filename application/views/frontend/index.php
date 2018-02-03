  <!-- Start Map-Wrapper -->
  <div class="map-wrapper">

    <!-- Start Map Search -->
    <div class="map-search">
      <div class="container">
        
        <!-- Start Search-Shadow -->
        <div class="search-shadow"></div>
        <!-- End Search-Shadow -->
        

        <form method="POST" action="<?php echo base_url('business/check'); ?>" class="default-form search-bar">
          <span class="cnpj_field">
            <input type="text" name="cnpj" placeholder="Insira o CNPJ da empresa">
          </span>

          <span class="submit-btn">
            <button type="submit" class="btn btn-secondary full-width"><i class="fa fa-search"></i>Buscar</button>
          </span>
        </form>
        <!-- End Form -->

        <hr>


        <!-- Start Form -->
        <form action="index.html" class="default-form search-bar">
          <span class="company_name">
            <input type="text" placeholder="Digite o nome da empresa">
          </span>

          <span class="location select-box">
            <select name="Select_Location" data-placeholder="Selecione o estado">
              <option>Selecione o estado</option>
              <option value="1">São Paulo</option>
            </select>
          </span>

          <span class="category select-box">
            <select name="Select_Category" data-placeholder="Selecione a cidade">
              <option>Selecione a Cidade</option>
              <option value="1">São Paulo</option>
            </select>
          </span>

          <span class="submit-btn">
            <button class="btn btn-secondary full-width"><i class="fa fa-search"></i>Buscar</button>
          </span>
        </form>
        <!-- End Form -->
      </div>
    </div>
    <!-- End Map Search -->
    
    <!-- Start Map Canvas -->
    <div id="map_canvas_wrapper">
      <div id="map_canvas"></div>
    </div>
    <!-- End Map Canvas -->

    <!-- Start Map Control -->
    <div class="map-control">
      <a href="#" class="btn btn-secondary full-width"><i class="fa fa-chevron-circle-up"></i><span>Ocultar Mapa</span></a>
    </div>
    <!-- End Map Control -->
  </div>
  <!-- End Map-Wrapper -->

