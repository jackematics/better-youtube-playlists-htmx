// Code generated by templ - DO NOT EDIT.

// templ: version: v0.2.513
package template

//lint:file-ignore SA4006 This context is only used if a nested component is present.

import "github.com/a-h/templ"
import "context"
import "io"
import "bytes"

func PlaylistOperations() templ.Component {
	return templ.ComponentFunc(func(ctx context.Context, templ_7745c5c3_W io.Writer) (templ_7745c5c3_Err error) {
		templ_7745c5c3_Buffer, templ_7745c5c3_IsBuffer := templ_7745c5c3_W.(*bytes.Buffer)
		if !templ_7745c5c3_IsBuffer {
			templ_7745c5c3_Buffer = templ.GetBuffer()
			defer templ.ReleaseBuffer(templ_7745c5c3_Buffer)
		}
		ctx = templ.InitializeContext(ctx)
		templ_7745c5c3_Var1 := templ.GetChildren(ctx)
		if templ_7745c5c3_Var1 == nil {
			templ_7745c5c3_Var1 = templ.NopComponent
		}
		ctx = templ.ClearChildren(ctx)
		_, templ_7745c5c3_Err = templ_7745c5c3_Buffer.WriteString("<div class=\"flex flex-row\"><button class=\"w-16 h-16 bg-white rounded-lg border-2 flex items-center justify-center cursor-pointer\"><img src=\"/static/assets/icons/previous.png\" alt=\"previous\" width=\"42\" height=\"42\"></button> <button class=\"w-16 h-16 bg-white rounded-lg border-2 flex items-center justify-center cursor-pointer ml-5\"><img src=\"/static/assets/icons/next.png\" alt=\"next\" width=\"42\" height=\"42\"></button> <button class=\"w-16 h-16 bg-white rounded-lg border-2 flex items-center justify-center cursor-pointer ml-5\"><img src=\"/static/assets/icons/shuffle-bold.png\" alt=\"shuffle\" width=\"50\" height=\"50\"></button> <button class=\"w-16 h-16 bg-white rounded-lg border-2 flex items-center justify-center cursor-pointer ml-5\"><img src=\"/static/assets/icons/loop-bold.png\" alt=\"loop\" width=\"55\" height=\"55\"></button></div>")
		if templ_7745c5c3_Err != nil {
			return templ_7745c5c3_Err
		}
		if !templ_7745c5c3_IsBuffer {
			_, templ_7745c5c3_Err = templ_7745c5c3_Buffer.WriteTo(templ_7745c5c3_W)
		}
		return templ_7745c5c3_Err
	})
}
