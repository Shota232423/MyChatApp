@extends('layouts.app')

@section('content')
<div class="container">
    <div id="comment_area" class="overflow-auto" style="height:70vh"></div>



    <form class="fixed-bottom">
        @csrf
        <div class="input-group">
            <textarea class="form-control" name="comment" id="comment" rows="2"
                placeholder="メッセージを入力してください。"></textarea>

            {{-- <input type="button" value="送信"> --}}

            <button type="button" id="submit" class="btn btn-primary">送信</button>
        </div>
    </form>
</div>

@endsection

@section('comment_js')
<script src="{{ asset('js/comment.js') }}"></script>
@endsection
