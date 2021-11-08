<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Comment;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }
    public function post(Request $request)
    {
        $comment = new Comment();
        $comment->comment = $request->comment;
        $comment->user_id = Auth::id();
        $comment->save();
        // dd(Comment::all());
        return response()->json(['comments'=>Comment::with(['user'])->orderBy('created_at', 'asc')->get(),
        'loginuserid'=>Auth::id()]);
    }

    public function show(){
        return response()->json(['comments'=>Comment::with(['user'])->orderBy('created_at', 'asc')->get(),'loginuserid'=>Auth::id()]);
    }
}