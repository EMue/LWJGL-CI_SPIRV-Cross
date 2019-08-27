#pragma clang diagnostic ignored "-Wmissing-prototypes"

#include <metal_stdlib>
#include <simd/simd.h>

using namespace metal;

constant float _16[16] = { 1.0, 2.0, 3.0, 4.0, 1.0, 2.0, 3.0, 4.0, 1.0, 2.0, 3.0, 4.0, 1.0, 2.0, 3.0, 4.0 };
constant float4 _60[4] = { float4(0.0), float4(1.0), float4(8.0), float4(5.0) };
constant float4 _104[4] = { float4(20.0), float4(30.0), float4(50.0), float4(60.0) };

struct main0_out
{
    float FragColor [[color(0)]];
};

struct main0_in
{
    int index [[user(locn0)]];
};

template<typename T, uint A>
void spvArrayCopyFromConstantToStack1(thread T (&dst)[A], constant T (&src)[A])
{
    for (uint i = 0; i < A; i++)
    {
        dst[i] = src[i];
    }
}

template<typename T, uint A>
void spvArrayCopyFromConstantToThreadGroup1(threadgroup T (&dst)[A], constant T (&src)[A])
{
    for (uint i = 0; i < A; i++)
    {
        dst[i] = src[i];
    }
}

template<typename T, uint A>
void spvArrayCopyFromStackToStack1(thread T (&dst)[A], thread const T (&src)[A])
{
    for (uint i = 0; i < A; i++)
    {
        dst[i] = src[i];
    }
}

template<typename T, uint A>
void spvArrayCopyFromStackToThreadGroup1(threadgroup T (&dst)[A], thread const T (&src)[A])
{
    for (uint i = 0; i < A; i++)
    {
        dst[i] = src[i];
    }
}

template<typename T, uint A>
void spvArrayCopyFromThreadGroupToStack1(thread T (&dst)[A], threadgroup const T (&src)[A])
{
    for (uint i = 0; i < A; i++)
    {
        dst[i] = src[i];
    }
}

template<typename T, uint A>
void spvArrayCopyFromThreadGroupToThreadGroup1(threadgroup T (&dst)[A], threadgroup const T (&src)[A])
{
    for (uint i = 0; i < A; i++)
    {
        dst[i] = src[i];
    }
}

fragment main0_out main0(main0_in in [[stage_in]])
{
    main0_out out = {};
    out.FragColor = _16[in.index];
    if (in.index < 10)
    {
        out.FragColor += _16[in.index ^ 1];
    }
    else
    {
        out.FragColor += _16[in.index & 1];
    }
    if (in.index > 30)
    {
        out.FragColor += _60[in.index & 3].y;
    }
    else
    {
        out.FragColor += _60[in.index & 1].x;
    }
    float4 foobar[4] = { float4(0.0), float4(1.0), float4(8.0), float4(5.0) };
    if (in.index > 30)
    {
        foobar[1].z = 20.0;
    }
    out.FragColor += foobar[in.index & 3].z;
    float4 baz[4] = { float4(0.0), float4(1.0), float4(8.0), float4(5.0) };
    spvArrayCopyFromConstantToStack1(baz, _104);
    out.FragColor += baz[in.index & 3].z;
    return out;
}

