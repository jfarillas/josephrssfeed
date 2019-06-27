<?php

namespace App\Http\Controllers\api;

use Illuminate\Http\Request;
use App\Http\Controllers\api\BaseController as BaseController;
use Illuminate\Support\Facades\Route;
use \Feeds;

class ListController extends BaseController
{
    public $feedAry = [
            'news' => 'https://www.independent.ie/irish-news/rss',
            'sport' => 'https://www.independent.ie/sport/rss',
            'business' => 'https://www.independent.ie/business/rss',
            'entertainment' => 'https://www.independent.ie/entertainment/rss'
    ];

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        // if RSS Feed has invalid mime types, force to read
        $rs = [];
        foreach ($this->feedAry as $key => $val) {
            $feed = Feeds::make($val, true);
            $rs[$key] = [
              'title' => (null !== $feed->get_title()) ? $feed->get_title() : '',
              'category' => Route::getFacadeRoot()->current()->uri().'/'.$key
              //'items'     => $feed->get_items(),
            ];
            
        }
        $data = [$rs];
        return $this->sendResponse($data, 'RSS Feed Categories retrieved successfully.');
    }

    public function category($category) {
        switch ($category) {
            case 'news':
                $feedUrl = $this->feedAry['news'];
            break;
            case 'sport':
                $feedUrl = $this->feedAry['sport'];
            break;
            case 'business':
                $feedUrl = $this->feedAry['business'];
            break;
            case 'entertainment':
                $feedUrl = $this->feedAry['entertainment'];
            break;
        }

        // if RSS Feed has invalid mime types, force to read
        $feed = Feeds::make($feedUrl, true);
        $items = [];
        $ctr = 0;
        foreach ($feed->get_items() as $key) {
            $items[$ctr]['title'] = $key->get_title();
            $items[$ctr]['permalink'] = $key->get_permalink();
            $items[$ctr]['description'] = $key->get_description();
            $items[$ctr]['datePosted'] = $key->get_date('j F Y | g:i a');
            $ctr++;
        }
        $data[] = [
          'title' => $feed->get_title(),
          'permalink' => $feed-> get_permalink(),
          'items' => $items
        ];

        /* print '<pre>';
        print_r($data);
        exit; */
        return $this->sendResponse($data, ucfirst($category).' RSS Feed retrieved successfully.');

    }
}
