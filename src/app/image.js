"use client"
import React, { useRef, useEffect, useState } from "react";
import style from './page.module.css'
const Canvas = (props) => {
    const canvasRef = useRef(null)
    const [col, setcol] = useState('black')
    const [imgw, setimgw] = useState(0)
    const [imgh, setimgh] = useState(0)
    const [text1, settext1] = useState('')
    const [coltext1, setcoltext1] = useState('white');
    const [text1x, settext1x] = useState(40)
    const [text1y, settext1y] = useState(60)
    const [img, setimg] = useState()
    const [imgx, setimgx] = useState(0)
    const [imgy, setimgy] = useState(0); 
    const [border, setborder] = useState(0); 
    const [bcolor, setbcolor] = useState('black')
    const [text2, settext2] = useState('')
    const [text3, settext3] = useState('')
    const [bradius, setbradius] = useState(0)
    const [fontsize, setfontsize] = useState(23)

    const poster = () => {
        const image = new Image()
        image.src = `/${img}`
        const imgText = text1;
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        context.fillStyle = coltext1; // You can use any valid color value

        // Set the font properties
        context.font = `${fontsize}px Arial`;
        context.shadowColor = col;
        context.shadowBlur = 40
        // Draw the text with the specified font color
        context.fillText(imgText, text1x, text1y); // Replace coordinates as needed
        context.fillText(text2,80,100); 
        context.fillText(text3,180,100); 

        image.onload = () => {
            context.drawImage(image, imgx, imgy)
        }
    }

    const uploadFile = async ({ url, fileName, fileData }) => {
        const data = new FormData();
        data.append(fileName, fileData);

        try {
            const req = await fetch(url, { method: 'POST', body:data });
            return await req.json();
        } catch (err) {
            return null;
        }
    };
    const handlClick = () => {
        console.log(document.getElementById('this').files[0])
        const params = {
            url: '/api',
            fileName: 'file',
            fileData: document.getElementById('this').files[0]
        };
        uploadFile(params).then(results => {
            console.log(results.file)
            setimg(results.file)
            poster(); 
        });
    }

    const reactstyle = {
        backgroundColor: col,
        display : 'block',
        fontWeight: 'bold',
        margin : "20px auto",
        border : `${border}px solid ${bcolor}`,
        borderRadius : `${bradius}px`
    }
    const handleChange = (e) => {
        if (e.target.id == 'co') {
            setcol(e.target.value)
            poster();
        }
        else if (e.target.id == 'imgw') {
            setimgw(parseInt(e.target.value))
            settext1x(parseInt(e.target.value)/3)
            setimgx(parseInt(e.target.value)/4)

            poster();

        }
        else if (e.target.id == 'imgh') {
            setimgh(parseInt(e.target.value))
            settext1y(parseInt(e.target.value)/8); 
            setimgy(parseInt(e.target.value)/5)

            poster();

        }
        else if (e.target.id == 'text1') {
            settext1(e.target.value)
            console.log('')
            poster();

            console.log(e.target.value)
        }
        else if (e.target.id == 'coltext1') {
            setcoltext1(e.target.value)
            poster();

        }
        else if (e.target.id == 'text1x') {

            settext1x(parseInt(e.target.value))
            poster();

        }
        else if (e.target.id == 'text1y') {
            settext1y(parseInt(e.target.value))
            poster();

        }
        else if(e.target.id == 'imgX'){
            setimgx(e.target.value);
            poster();

        }
        else if(e.target.id == 'imgY'){
            setimgy(e.target.value);
            poster();

        }
        else if(e.target.id == 'border'){
            setborder(parseInt(e.target.value))
        }
        else if(e.target.id == 'bcolor'){
            setbcolor(e.target.value)
        }
        else if(e.target.id == 'text2'){
            settext2(e.target.value)
        }
        else if(e.target.id == 'text3'){
            settext3(e.target.value)
        }
        else if(e.target.id == 'borderr'){
            setbradius(e.target.value); 
            
        }
        else if(e.target.id == 'fsize'){
            setfontsize(e.target.value); 
            poster();

        }
     

    }

    useEffect(() => {
        poster();
    }, [])

    var download = function(){
        console.log('clieked ')
        var link = document.createElement('a');
        link.download = 'filename.jpg';
        link.href = document.getElementById('canvas').toDataURL('image/png')
        link.click();
      }

    return (
        <>
        
            <div className={style.inputs}>
                <label htmlFor="co">Set the Color of Background </label>
                <input type="color" name="color" id="co" onChange={handleChange} />
                <input placeholder="Set the Width of Background " type="text" name="imgw" id="imgw" onChange={handleChange} />
                <input type="text" name="imgh" id="imgh" onChange={handleChange} placeholder="Set the Height of Background" />
                <input type="text" name="text1" id="text1" onChange={handleChange} placeholder="Enter the text You want to insert" />
                <label htmlFor="coltext1">Set the Color of Font </label>
                <input type="color" name="coltext1" id="coltext1" onChange={handleChange} />
                <label htmlFor="text1x">Set the Text X origin </label>
                <input type="number" name="coltext1" id="text1x" onChange={handleChange} placeholder="Enter the text Position in X " value={text1x} />
                <label htmlFor="text1y">Se the text Y origin </label>
                <input value={text1y} type="number" name="coltext1" id="text1y" onChange={handleChange} placeholder="Enter the text Position in Y " />
                <label htmlFor="fsize">Set the Font Size </label>
                <input value={fontsize} type="number" id="fsize" placeholder="Enter Your Border pixel"  onChange={handleChange}/>

                <input type="file" name="this" id="this" />
                <button onClick={handlClick}>upload </button>
                <label htmlFor="imgX">Set the Image X coordinates</label>
                <input value={imgx} type="number" id="imgX" placeholder="Enter the Coordinate of Image X "   onChange={handleChange}  />
                <label htmlFor="imgY">Set the Image Y coordinates</label>
                <input value={imgy} type="number" id="imgY" placeholder="Enter the Coordinate of Image Y "  onChange={handleChange}   />
                <label htmlFor="border">Set the Border Px </label>
                <input value={border} type="number" id="border" placeholder="Enter Your Border pixel"  onChange={handleChange}/>
                <label htmlFor="bcolor">Set the border Color </label>
                <input value={bcolor} type="color" id="bcolor" placeholder="Set the Border Color " onChange={handleChange} />
                <label htmlFor="borderr">Set the border radius</label>
                <input value={bradius} type="number" id="borderr" placeholder="Enter Your Border pixel"  onChange={handleChange}/>
              


                

            </div>


            <canvas ref={canvasRef} {...props} width={imgw} height={imgh} style={reactstyle} id="canvas" />

            <button onClick={download} className={style.buttons}>Download</button>
        </>
    )
}

export default Canvas