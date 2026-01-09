<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ResourceSession;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ResourceSessionController extends Controller
{
    public function index()
    {
        $sessions = ResourceSession::all();
        return Inertia::render('Admin/ResourceSessions/Index', [
            'sessions' => $sessions,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/ResourceSessions/Create');
    }

    public function store(Request $request)
    {
        $session = ResourceSession::create($request->all());
        return redirect()->route('admin.resource-sessions.index');
    }

    public function show(ResourceSession $resourceSession)
    {
        return Inertia::render('Admin/ResourceSessions/Show', [
            'session' => $resourceSession,
        ]);
    }

    public function edit(ResourceSession $resourceSession)
    {
        return Inertia::render('Admin/ResourceSessions/Edit', [
            'session' => $resourceSession,
        ]);
    }

    public function update(Request $request, ResourceSession $resourceSession)
    {
        $resourceSession->update($request->all());
        return redirect()->route('admin.resource-sessions.index');
    }

    public function destroy(ResourceSession $resourceSession)
    {
        $resourceSession->delete();
        return redirect()->route('admin.resource-sessions.index');
    }

    public function duplicate(ResourceSession $resourceSession)
    {
        $newSession = $resourceSession->replicate();
        $newSession->save();
        return redirect()->route('admin.resource-sessions.index');
    }

    public function togglePublish(ResourceSession $resourceSession)
    {
        $resourceSession->published = !$resourceSession->published;
        $resourceSession->save();
        return redirect()->route('admin.resource-sessions.index');
    }
}
