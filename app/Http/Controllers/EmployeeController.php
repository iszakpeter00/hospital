<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use App\Models\Employee;
use Illuminate\Support\Arr;
use Illuminate\Validation\Rules\Enum;


class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $employees = Employee::query();

        foreach ($request->all() as $key => $value) {
            $employees = $employees->where($key, $value);
        }

        return $employees->orderBy('name')->get()->toArray();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\EmployeeRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) //EmployeeRequest
    {
        $data = $request->all();    //ha megvan a EmployeeRequest, akkor a validated() metódussal kell
        Employee::create($data);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Employee  $employee
     * @return \Illuminate\Http\Response
     */
    public function show(Employee $employee, Request $request)
    {
        return $employee;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateEmployeeRequest  $request
     * @param  \App\Models\Employee  $employee
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Employee $employee) //UpdateEmployeeRequest
    {
        $data = $request->all();
        $employee->update($data);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Employee  $employee
     * @return \Illuminate\Http\Response
     */
    public function destroy(Employee $employee, Request $request)
    {
        $employee->delete();

        return response('Delete successful', 204);
    }

}
