import React, { useEffect, useRef } from 'react';
// @ts-ignore
import * as BABYLON from 'babylonjs';

interface AnimatedFigure3DProps {
  width?: number;
  height?: number;
}

export const AnimatedFigure3D: React.FC<AnimatedFigure3DProps> = ({ 
  width = 600, 
  height = 600 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<BABYLON.Engine | null>(null);
  const sceneRef = useRef<BABYLON.Scene | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize Babylon.js engine
    const engine = new BABYLON.Engine(canvasRef.current, true);
    engineRef.current = engine;

    // Create scene
    const scene = new BABYLON.Scene(engine);
    sceneRef.current = scene;

    // Set background to transparent
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

    // Create camera
    const camera = new BABYLON.ArcRotateCamera(
      'camera',
      Math.PI / 2,
      Math.PI / 2.5,
      50,
      new BABYLON.Vector3(0, 0, 0),
      scene
    );
    camera.attachControl(canvasRef.current, true);
    camera.inertia = 0.7;
    camera.angularSensibilityX = 1000;
    camera.angularSensibilityY = 1000;

    // Create lights
    const light1 = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
    light1.intensity = 0.9;

    const light2 = new BABYLON.PointLight('light2', new BABYLON.Vector3(10, 20, 10), scene);
    light2.intensity = 0.8;
    light2.range = 100;

    // Create a cute 3D figure (simplified character)
    // Head
    const head = BABYLON.MeshBuilder.CreateSphere('head', { diameter: 8, segments: 32 }, scene);
    head.position.y = 12;
    
    const headMaterial = new BABYLON.StandardMaterial('headMat', scene);
    (headMaterial as any).diffuse = new BABYLON.Color3(1, 0.9, 0.85); // Skin tone
    (headMaterial as any).specularColor = new BABYLON.Color3(0.2, 0.2, 0.2);
    head.material = headMaterial;

    // Body
    const body = BABYLON.MeshBuilder.CreateCylinder('body', { diameter: 6, height: 10, tessellation: 32 }, scene);
    body.position.y = 3;
    
    const bodyMaterial = new BABYLON.StandardMaterial('bodyMat', scene);
    (bodyMaterial as any).diffuse = new BABYLON.Color3(0.9, 0.7, 0.8); // Soft pink dress
    (bodyMaterial as any).specularColor = new BABYLON.Color3(0.3, 0.3, 0.3);
    body.material = bodyMaterial;

    // Left arm
    const leftArm = BABYLON.MeshBuilder.CreateCylinder('leftArm', { diameter: 2, height: 12, tessellation: 16 }, scene);
    leftArm.position.x = -5;
    leftArm.position.y = 8;
    leftArm.rotation.z = Math.PI / 6;
    leftArm.material = headMaterial;

    // Right arm
    const rightArm = BABYLON.MeshBuilder.CreateCylinder('rightArm', { diameter: 2, height: 12, tessellation: 16 }, scene);
    rightArm.position.x = 5;
    rightArm.position.y = 8;
    rightArm.rotation.z = -Math.PI / 6;
    rightArm.material = headMaterial;

    // Left leg
    const leftLeg = BABYLON.MeshBuilder.CreateCylinder('leftLeg', { diameter: 2, height: 10, tessellation: 16 }, scene);
    leftLeg.position.x = -2;
    leftLeg.position.y = -4;
    leftLeg.material = headMaterial;

    // Right leg
    const rightLeg = BABYLON.MeshBuilder.CreateCylinder('rightLeg', { diameter: 2, height: 10, tessellation: 16 }, scene);
    rightLeg.position.x = 2;
    rightLeg.position.y = -4;
    rightLeg.material = headMaterial;

    // Create heart in hand
    const heart = BABYLON.MeshBuilder.CreateBox('heart', { size: 2 }, scene);
    heart.position.x = 6;
    heart.position.y = 6;
    heart.position.z = 0;
    
    const heartMaterial = new BABYLON.StandardMaterial('heartMat', scene);
    (heartMaterial as any).diffuse = new BABYLON.Color3(0.9, 0.7, 0.8); // Blush pink
    (heartMaterial as any).emissiveColor = new BABYLON.Color3(0.2, 0.1, 0.15);
    heart.material = heartMaterial;

    // Animation loop
    let time = 0;
    engine.runRenderLoop(() => {
      time += 0.01;

      // Gentle floating animation
      head.position.y = 12 + Math.sin(time * 0.5) * 0.5;
      body.position.y = 3 + Math.sin(time * 0.5) * 0.5;
      leftArm.position.y = 8 + Math.sin(time * 0.5) * 0.5;
      rightArm.position.y = 8 + Math.sin(time * 0.5) * 0.5;
      leftLeg.position.y = -4 + Math.sin(time * 0.5) * 0.5;
      rightLeg.position.y = -4 + Math.sin(time * 0.5) * 0.5;

      // Arm waving animation
      leftArm.rotation.z = Math.PI / 6 + Math.sin(time * 1.5) * 0.3;
      rightArm.rotation.z = -Math.PI / 6 - Math.sin(time * 1.5) * 0.3;

      // Heart pulsing animation
      const scale = 1 + Math.sin(time * 2) * 0.2;
      heart.scaling = new BABYLON.Vector3(scale, scale, scale);
      heart.position.x = 6 + Math.sin(time * 1.5) * 0.5;
      heart.position.y = 6 + Math.sin(time * 0.7) * 0.8;

      // Gentle rotation of entire scene
      scene.meshes.forEach((mesh: any) => {
        if (mesh !== camera) {
          mesh.rotation.y += 0.002;
        }
      });

      scene.render();
    });

    // Handle window resize
    const handleResize = () => {
      engine.resize();
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (engineRef.current) {
        engineRef.current.dispose();
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        width: '100%',
        height: '100%',
        maxWidth: '600px',
        maxHeight: '600px',
        margin: '0 auto',
        display: 'block',
      }}
    />
  );
};

export default AnimatedFigure3D;
