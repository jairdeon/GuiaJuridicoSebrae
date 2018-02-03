<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Api extends CI_Controller {

    function get_business_meta($business_id, $meta_name){
        return $this->db->get_where('business_meta', ['business_id' => $business_id, 'meta_name' => $meta_name])->first_row()->meta_value;        
    }

	public function all_business() {
        header('Content-type: application/json');
        $json = [];

        $query = $this->db->get_where('business', ['situacao' => 'ativa'])->result();
        foreach($query as $data){
            $business_id = $data->id;
            $business_name = $data->business_name;
            $cnpj = $data->cnpj;
            $telefone_1 = $data->telefone_1;
            $telefone_2 = $data->telefone_2;
            $latitude = $this->get_business_meta($business_id, 'latitude');
            $longitude = $this->get_business_meta($business_id, 'longitude');

            $add_data = [                
                'latitude' => (float) $latitude,
                'longitude' => (float) $longitude,
                'icon' => (string) base_url() . '/public/themes/img/map-marker.png',
                'html' => '<div class="marker-ribbon"></div><div class="marker-holder"><div class="map-item-info"><h5 class="title"><a href="' . base_url('empresa/' . $cnpj) . '">' . $business_name . '</a></h5><br><div class="describe"><p class="contact-info address">' . $this->get_business_meta($business_id, 'endereco') . ', ' . $this->get_business_meta($business_id, 'numero') . ' -  ' . $this->get_business_meta($business_id, 'bairro') . ', ' . $this->get_business_meta($business_id, 'municipio') . '</p><p class="contact-info telephone">' . $telefone_1 . '</p><p class="contact-info email">' . $data->email . '</p><a href="' . base_url('empresa/' . $cnpj) . '" class="btn btn-primary full-width" style="padding:10px 0;">Ver mais informações</a></div></div></div></div></div>'
            ]; array_push($json, $add_data);
        }

        $json = json_encode($json);
        echo($json);
    }

    public function get_business($cnpj) {
        header('Content-type: application/json');
        $json = [];

        $data = $this->db->get_where('business', ['cnpj' => $cnpj])->first_row();

            $business_id = $data->id;
            $business_name = $data->business_name;
            $cnpj = $cnpj;
            $telefone_1 = $data->telefone_1;
            $telefone_2 = $data->telefone_2;
            $latitude = $this->get_business_meta($business_id, 'latitude');
            $longitude = $this->get_business_meta($business_id, 'longitude');

            $add_data = [                
                'latitude' => (float) $latitude,
                'longitude' => (float) $longitude,
                'icon' => (string) base_url() . '/public/themes/img/map-marker.png',
                'html' => '<div class="marker-ribbon"></div><div class="marker-holder"><div class="map-item-info"><h5 class="title"><a href="' . base_url('empresa/' . $cnpj) . '">' . $business_name . '</a></h5><br><div class="describe"><p class="contact-info address">' . $this->get_business_meta($business_id, 'endereco') . ', ' . $this->get_business_meta($business_id, 'numero') . ' -  ' . $this->get_business_meta($business_id, 'bairro') . ', ' . $this->get_business_meta($business_id, 'municipio') . '</p><a href="tel:' . $telefone_1 . '"><p class="contact-info telephone">' . $telefone_1 . '</p></a><a href="mailto:' . $data->email . '"><p class="contact-info email">' . $data->email . '</p></a></div></div></div></div></div>'
            ]; array_push($json, $add_data);

        $json = json_encode($json);
        echo($json);
    }
    
}