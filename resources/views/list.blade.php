{{-- @extends('layouts') --}}

{{-- @section('content') --}}
  
  @foreach ($rs as $key => $items)
    <div class="item">
      <h2><a href="{{ $items['category'] }}">{{ $items['title'] }}</a></h2>
    </div>
  @endforeach