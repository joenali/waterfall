<?php
class ListController extends Controller {
	/**
	 * This is the default 'index' action that is invoked
	 * when an action is not explicitly requested by users.
	 */
	public function actionIndex() {
        $db = Yii::app()->db;
        $offset = 20;

        $request = Yii::app()->request;
        $lazy = $request->getParam('lazy', '');
        $page = $request->getParam('page', 1);

        $count = $db->createCommand()
            ->select('count(*)')
            ->from('gw_image')
            ->queryScalar();

        $data = $db->createCommand()
            ->from('gw_image')
            ->offset(($page - 1) * $offset)
            ->limit($offset)
            ->order('created DESC')
            ->queryAll();

        $template = $lazy ? 'lazy' : 'index';

        $this->renderPartial($template, array(
            'data' => $data,
        ));
	}

	public function actionData() {
		$this->renderPartial('data');
	}

	public function actionSave() {
        set_time_limit(0);
        $error = 0;
        $db = Yii::app()->db;
        $request = Yii::app()->request;
        $bigLogo = $request->getParam('bigLogo', '');
        $imgHeight = $request->getParam('imgHeight', 0);

        $info = pathinfo($bigLogo);

        $rootPath = Yii::app()->basePath . '/..';
        $targetDir = 'upload/' . uniqid();

        if (!file_exists($rootPath . '/' . $targetDir)) {
            mkdir($rootPath . '/' . $targetDir);
        }

        $name = $info['basename'];
        $absolute = $rootPath . '/' . $targetDir . '/' . $name;
        $url = $this->grabImage($bigLogo, $absolute);
        if (file_exists($url)) {
            $db->createCommand()->insert('gw_image', array(
                    'name' => $name,
                    'url' => $targetDir . '/' . $name,
                    'description' => $description,
                    'img_height' => $imgHeight,
                    'created' => time(),
            ));
        } else {
            $error = 1;
        }

        echo $error;exit;
	}

    protected function grabImage($url,$filename="") {
        if($url==""):return false;endif;
        if($filename=="") {
            $ext=strrchr($url,".");
            if($ext!=".gif" && $ext!=".jpg") {
                return false;
            }
            $filename=date("dMYHis").$ext;
        }
        ob_start();
        readfile($url);
        $img = ob_get_contents();
        ob_end_clean();
        $size = strlen($img);
        $fp2=@fopen($filename, "a");
        fwrite($fp2,$img);
        fclose($fp2);
        return $filename;
	}
}
