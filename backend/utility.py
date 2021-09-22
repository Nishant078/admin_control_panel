def dump_func_name(func):
    def wrapper_func(*func_args, **func_kwargs):
        print("")
        print(f"func start: {func.__name__}")
        rtn = func(*func_args, **func_kwargs)
        print(f"func end: {func.__name__}")
        return rtn

    return wrapper_func
