<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Business extends CI_Controller {

	public function check(){
        $this->load->model('business_model');
        $cnpj = (string) $_POST['cnpj'];

        $exist = $this->business_model->check($cnpj);
        if($exist > 0){
            echo "Existe";
        } else {            
            $curl_sebrae = curl_init();
            curl_setopt($curl_sebrae, CURLOPT_SSL_VERIFYPEER, 0);
            curl_setopt($curl_sebrae, CURLOPT_SSL_VERIFYHOST, 0);
            curl_setopt_array($curl_sebrae, array(
                CURLOPT_URL => "https://apiplataforma.sebrae.com.br/graphql",
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => "",
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 30,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => "POST",
                CURLOPT_POSTFIELDS => "{\"query\":\"{obterEmpresasPorCnpj(cnpj:\\\"" . $cnpj . "\\\"){uf dadosFaturamentos {ano porte}}}\"}",
                CURLOPT_HTTPHEADER => array(
                "Cache-Control: no-cache",
                "Content-Type: application/json",
                "Postman-Token: 2ec71432-0498-f98a-ced7-4c54427d50cf"
                ),
            ));

            $json_sebrae = curl_exec($curl_sebrae);
            $error_sebrae = curl_error($curl_sebrae);
            curl_close($curl_sebrae);

            if ($error_sebrae) {
            echo "cURL Error #:" . $error_sebrae;
            die();
            } else {
                $data_sebrae = (object) json_decode($json_sebrae, true);
                $data_sebrae = $data_sebrae->data['obterEmpresasPorCnpj'][0]['dadosFaturamentos'];
            }

            $json_receita = file_get_contents('https://www.receitaws.com.br/v1/cnpj/' . $cnpj);
            $data_receita = (object) json_decode($json_receita, true);

            $json_gmaps_url = str_replace(' ', '%20', 'https://maps.googleapis.com/maps/api/geocode/json?address=' . $data_receita->logradouro . ',' . $data_receita->numero . ',' . $data_receita->bairro . ',' . $data_receita->municipio . ',' . $data_receita->uf . '&key=AIzaSyCe7TOMjkLdiA7IbGA_WR7jOFynrfnK_c0');
            $json_gmaps = file_get_contents($json_gmaps_url);
            $data_gmaps = (object) json_decode($json_gmaps, true);
            $latitude = $data_gmaps->results[0]['geometry']['location']['lat'];
            $longitude = $data_gmaps->results[0]['geometry']['location']['lng'];
            
            @$telefone_1 = explode('/', $data_receita->telefone)[0];
            @$telefone_2 = explode('/', $data_receita->telefone)[1];

            $business_data = [
                'cnae' => str_replace(array('-', '.'), '', $data_receita->atividade_principal[0]['code']),
                'business_name' => $data_receita->nome,
                'telefone_1' => str_replace(array('-', '(', ')', ' '), '', $telefone_1),
                'telefone_2' => str_replace(array('-', '(', ')', ' '), '', $telefone_2),
                'email' => $data_receita->email,
                'situacao' => $data_receita->situacao,
                'cnpj' => $cnpj,
            ];

            $business_meta = [
                'atividade_principal' => $data_receita->atividade_principal[0]['text'],
                'abertura' => $data_receita->data_situacao,
                'endereco' => $data_receita->logradouro,
                'numero' => $data_receita->numero,
                'bairro' => $data_receita->bairro,
                'complemento' => str_replace(';', '', $data_receita->complemento),
                'municipio' => $data_receita->municipio,
                'uf' => $data_receita->uf,
                'cep' => str_replace(array('-', '.'), '', $data_receita->cep),
                'atividades_secundarias' => json_encode($data_receita->atividades_secundarias),
                'dadosFaturamentos' => json_encode($data_sebrae),
                'qsa' => json_encode($data_receita->qsa),
                'latitude' => $latitude,
                'longitude' => $longitude
            ];

            $this->business_model->insert_data($business_data, $business_meta);
            redirect(base_url());
        }        
        
    }
    
}
