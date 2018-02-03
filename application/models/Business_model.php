<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Business_model extends CI_Controller {

	public function check($cnpj){
        $query = $this->db->get_where('business', ['cnpj' => $cnpj])->result();
        return count($query);
    }
    

    public function insert_data($business_data, $business_meta){
        $this->db->insert('business', $business_data);
        $business_id = $this->db->insert_id();

        foreach($business_meta as $data => $value){
            $this->db->insert('business_meta', ['business_id' => $business_id, 'meta_name' => $data, 'meta_value' => $value]);
        }

    }
    
}
